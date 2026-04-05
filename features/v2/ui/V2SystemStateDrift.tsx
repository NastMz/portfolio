'use client'

import { useEffect, useMemo, useState } from 'react'

interface V2SystemStateDriftProps {
  initialState: string
  states?: string[]
}

const MIN_INTERVAL_MS = 8000
const INTERVAL_WINDOW_MS = 7000

function getNextDelay() {
  return MIN_INTERVAL_MS + Math.floor(Math.random() * (INTERVAL_WINDOW_MS + 1))
}

export function V2SystemStateDrift({ initialState, states }: V2SystemStateDriftProps) {
  const availableStates = useMemo(() => {
    const source = states?.filter(Boolean) ?? []
    return source.length > 0 ? source : [initialState]
  }, [initialState, states])

  const reservedWidth = useMemo(() => {
    const longestState = availableStates.reduce((max, current) => Math.max(max, current.length), 0)
    return `${Math.max(longestState + 2, 1)}ch`
  }, [availableStates])

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (availableStates.length <= 1) {
      return
    }

    let timeoutId: number | undefined

    const scheduleNextTick = () => {
      timeoutId = window.setTimeout(() => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % availableStates.length)
        scheduleNextTick()
      }, getNextDelay())
    }

    scheduleNextTick()

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [availableStates])

  return (
    <span className="inline-block text-right tabular-nums" style={{ minWidth: reservedWidth }}>
      {availableStates[activeIndex] ?? initialState}
    </span>
  )
}
