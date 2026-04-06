'use client'

import { type FormEvent, useEffect, useRef, useState } from 'react'

const SUCCESS_SEQUENCE_STEP_MS = 250
const SUCCESS_SEQUENCE_COMPLETE_DELAY_MS = 100

export interface V2ContactTerminalFormCopy {
  bootLine: string
  helperLine: string
  previewHint: string
  fallbackHint: string
  fallbackLabel: string
  identityLabel: string
  endpointLabel: string
  identityPlaceholder: string
  endpointPlaceholder: string
  submitHint: string
  submitLabel: string
  feedback: {
    identityRequired: string
    endpointInvalid: string
    copyUnavailable: string
    successSequence: string[]
  }
  mail: {
    targetAddress: string
    subjectPrefix: string
    contextLabel: string
    payloadLabel: string
    defaultMessage: string
  }
}

interface V2ContactTerminalFormProps {
  copy: V2ContactTerminalFormCopy
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function encodeMailtoValue(value: string): string {
  return encodeURIComponent(value)
}

export function V2ContactTerminalForm({ copy }: V2ContactTerminalFormProps) {
  const [identity, setIdentity] = useState('')
  const [endpointAddress, setEndpointAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<
    | { type: 'error'; message: string }
    | { type: 'success'; messages: string[] }
    | null
  >(null)
  const timeoutRefs = useRef<number[]>([])

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    }
  }, [])

  function clearScheduledSequence() {
    timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    timeoutRefs.current = []
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    clearScheduledSequence()

    const normalizedIdentity = identity.trim()
    const normalizedEndpoint = endpointAddress.trim()

    if (!normalizedIdentity) {
      setFeedback({ type: 'error', message: copy.feedback.identityRequired })
      return
    }

    if (!EMAIL_REGEX.test(normalizedEndpoint)) {
      setFeedback({ type: 'error', message: copy.feedback.endpointInvalid })
      return
    }

    const subject = `[${copy.mail.subjectPrefix}] ${normalizedIdentity}`
    const body = [
      `[${copy.mail.contextLabel}: v2-contact-handshake]`,
      `IDENTITY=${normalizedIdentity}`,
      `ENDPOINT_ADDRESS=${normalizedEndpoint}`,
      '',
      `[${copy.mail.payloadLabel}]`,
      copy.mail.defaultMessage,
    ].join('\n')

    const mailtoHref = `mailto:${copy.mail.targetAddress}?subject=${encodeMailtoValue(subject)}&body=${encodeMailtoValue(body)}`
    const sequence = copy.feedback.successSequence

    setIsSubmitting(true)
    setFeedback({ type: 'success', messages: [sequence[0]] })

    sequence.slice(1).forEach((message, index) => {
      const timeoutId = window.setTimeout(() => {
        setFeedback((current) => {
          if (current?.type !== 'success') {
            return current
          }

          return {
            type: 'success',
            messages: [...current.messages, message],
          }
        })
      }, SUCCESS_SEQUENCE_STEP_MS * (index + 1))

      timeoutRefs.current.push(timeoutId)
    })

    const launchTimeoutId = window.setTimeout(() => {
      setIsSubmitting(false)
      window.location.href = mailtoHref
    }, SUCCESS_SEQUENCE_STEP_MS * (sequence.length - 1) + SUCCESS_SEQUENCE_COMPLETE_DELAY_MS)

    timeoutRefs.current.push(launchTimeoutId)
  }

  async function handleCopyEndpoint() {
    try {
      await navigator.clipboard.writeText(copy.mail.targetAddress)
      setFeedback({ type: 'success', messages: ['> fallback_ready', '> endpoint_copied'] })
    } catch {
      setFeedback({ type: 'error', message: copy.feedback.copyUnavailable })
    }
  }

  return (
    <div className="border border-zinc-800 bg-[#080808] text-left shadow-[0_0_0_1px_rgba(255,124,245,0.06)]">
      <div className="flex items-center justify-between gap-4 border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        </div>
        <div className="font-label text-[10px] uppercase tracking-[0.28em] text-zinc-500/95 font-medium">terminal://contact-protocol</div>
      </div>

      <div className="border-b border-zinc-800 px-4 py-3 font-label text-[10px] uppercase tracking-[0.2em] text-primary">
        <div>{copy.bootLine}</div>
        <div className="mt-1 text-zinc-400/90 font-medium">{copy.helperLine}</div>
      </div>

      <form className="space-y-4 p-4 md:p-6" noValidate onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 group">
            <label className="block font-label text-[10px] text-zinc-400/90 tracking-widest uppercase mb-2" htmlFor="contact-identity">
              {copy.identityLabel}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-label">&gt;</span>
              <input
                id="contact-identity"
                aria-invalid={feedback?.type === 'error' && !identity.trim()}
                className="w-full bg-black border border-zinc-800 py-4 pl-10 pr-4 text-white focus:ring-0 focus:border-primary font-label text-xs placeholder:text-zinc-500"
                name="identity"
                onChange={(event) => setIdentity(event.target.value)}
                placeholder={copy.identityPlaceholder}
                type="text"
                value={identity}
              />
            </div>
          </div>
          <div className="flex-1 group">
            <label className="block font-label text-[10px] text-zinc-400/90 tracking-widest uppercase mb-2" htmlFor="contact-endpoint">
              {copy.endpointLabel}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-label">$</span>
              <input
                id="contact-endpoint"
                aria-invalid={feedback?.type === 'error' && endpointAddress.trim().length > 0 && !EMAIL_REGEX.test(endpointAddress.trim())}
                className="w-full bg-black border border-zinc-800 py-4 pl-10 pr-4 text-white focus:ring-0 focus:border-primary font-label text-xs placeholder:text-zinc-500"
                name="endpointAddress"
                onChange={(event) => setEndpointAddress(event.target.value)}
                placeholder={copy.endpointPlaceholder}
                type="email"
                value={endpointAddress}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-label text-[10px] uppercase tracking-[0.22em] text-zinc-500/95 font-medium">{copy.previewHint}</div>
          <div className="border-l border-primary/20 bg-zinc-950/70 px-4 py-3 font-label text-[10px] uppercase tracking-[0.18em] text-zinc-400/90 font-medium cursor-default select-none">
            $ send_message --identity=&quot;{identity.trim() || copy.identityPlaceholder}&quot; --endpoint=&quot;{endpointAddress.trim() || copy.endpointPlaceholder}&quot;
          </div>
        </div>

        {feedback ? (
          feedback.type === 'error' ? (
            <p className="font-label text-[10px] uppercase tracking-widest text-error" role="status">
              [{feedback.message}]
            </p>
          ) : (
            <div className="space-y-1 font-label text-[10px] uppercase tracking-widest text-primary" role="status" aria-live="polite">
              {feedback.messages.map((message) => (
                <p key={message}>[{message}]</p>
              ))}
            </div>
          )
        ) : null}

        <button className="w-full bg-primary text-on-primary py-5 font-headline font-bold text-xl glitch-hover disabled:cursor-not-allowed disabled:opacity-90" disabled={isSubmitting} type="submit">
          {copy.submitLabel}
        </button>

        <div className="font-label text-[10px] uppercase tracking-[0.22em] text-zinc-500/95 text-center font-medium">{copy.submitHint}</div>

        <div className="border-t border-zinc-800/80 pt-4 text-center space-y-3">
          <div className="font-label text-[10px] uppercase tracking-[0.22em] text-zinc-500/95 font-medium">{copy.fallbackHint}</div>
          <button
            className="inline-flex items-center justify-center border border-zinc-700 bg-black/40 px-4 py-2 font-label text-[10px] uppercase tracking-[0.18em] text-zinc-300/95 hover:border-primary/30 hover:text-primary transition-none"
            type="button"
            onClick={handleCopyEndpoint}
          >
            {copy.fallbackLabel}
          </button>
        </div>
      </form>
    </div>
  )
}
