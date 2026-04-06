'use client'

import { useEffect, useMemo, useState } from 'react'

interface V2SidebarRotatingLogProps {
  initialLog: string
  logs?: string[]
}

const MIN_ROTATION_MS = 2000
const ROTATION_WINDOW_MS = 2000
const MIN_STABLE_ROTATIONS_BETWEEN_RECOVERABLE_WARNINGS = 6
const STABLE_ROTATION_VARIANCE = 5

export const RECOVERABLE_LOG_SEQUENCE = [
  'LATEST_LOG: WARN - retry_attempt: 1',
  'LATEST_LOG: WARN - transient_failure',
  'LATEST_LOG: OK - retry_resolved',
] as const

interface V2SidebarLogState {
  activeIndex: number
  currentLog: string
  pendingSequence: string[]
  stableRotationsUntilSequence: number
}

function getNextDelay() {
  return MIN_ROTATION_MS + Math.floor(Math.random() * (ROTATION_WINDOW_MS + 1))
}

export function getStableRotationsUntilSequence(randomValue: number = Math.random()) {
  return MIN_STABLE_ROTATIONS_BETWEEN_RECOVERABLE_WARNINGS + Math.floor(randomValue * STABLE_ROTATION_VARIANCE)
}

function createInitialState(initialLog: string, availableLogs: string[]): V2SidebarLogState {
  return {
    activeIndex: 0,
    currentLog: availableLogs[0] ?? initialLog,
    pendingSequence: [],
    stableRotationsUntilSequence: getStableRotationsUntilSequence(),
  }
}

export function getNextSidebarLogState(currentState: V2SidebarLogState, availableLogs: string[]): V2SidebarLogState {
  if (availableLogs.length === 0) {
    return currentState
  }

  if (currentState.pendingSequence.length > 0) {
    const [nextLog, ...remainingSequence] = currentState.pendingSequence

    return {
      ...currentState,
      currentLog: nextLog,
      pendingSequence: remainingSequence,
      stableRotationsUntilSequence: remainingSequence.length === 0
        ? getStableRotationsUntilSequence()
        : currentState.stableRotationsUntilSequence,
    }
  }

  const nextIndex = (currentState.activeIndex + 1) % availableLogs.length

  if (currentState.stableRotationsUntilSequence <= 1) {
    return {
      activeIndex: nextIndex,
      currentLog: RECOVERABLE_LOG_SEQUENCE[0],
      pendingSequence: [...RECOVERABLE_LOG_SEQUENCE.slice(1)],
      stableRotationsUntilSequence: getStableRotationsUntilSequence(),
    }
  }

  return {
    activeIndex: nextIndex,
    currentLog: availableLogs[nextIndex],
    pendingSequence: [],
    stableRotationsUntilSequence: currentState.stableRotationsUntilSequence - 1,
  }
}

export function V2SidebarRotatingLog({ initialLog, logs }: V2SidebarRotatingLogProps) {
  const availableLogs = useMemo(() => logs?.filter(Boolean) ?? [], [logs])
  const [logState, setLogState] = useState<V2SidebarLogState>(() => createInitialState(initialLog, availableLogs))

  useEffect(() => {
    setLogState(createInitialState(initialLog, availableLogs))
  }, [availableLogs, initialLog])

  useEffect(() => {
    if (availableLogs.length <= 1) {
      return
    }

    let timeoutId: number | undefined

    const scheduleNextTick = () => {
      timeoutId = window.setTimeout(() => {
        setLogState((currentState) => getNextSidebarLogState(currentState, availableLogs))
        scheduleNextTick()
      }, getNextDelay())
    }

    scheduleNextTick()

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [availableLogs])

  const currentLog = availableLogs.length <= 1 ? (availableLogs[0] ?? initialLog) : logState.currentLog

  return (
    <div aria-live="polite" className="text-[8px] text-zinc-500/95 mt-2 font-label font-medium transition-opacity duration-300 motion-reduce:transition-none">
      {currentLog}
    </div>
  )
}
