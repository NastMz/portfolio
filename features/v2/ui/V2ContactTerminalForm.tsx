'use client'

import { type FormEvent, useState } from 'react'

type FeedbackType = 'error' | 'success'

export interface V2ContactTerminalFormCopy {
  bootLine: string
  helperLine: string
  identityLabel: string
  endpointLabel: string
  identityPlaceholder: string
  endpointPlaceholder: string
  submitHint: string
  submitLabel: string
  feedback: {
    identityRequired: string
    endpointInvalid: string
    success: string
  }
  mail: {
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
  const [feedback, setFeedback] = useState<{ type: FeedbackType; message: string } | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

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

    setFeedback({ type: 'success', message: copy.feedback.success })

    const subject = `[${copy.mail.subjectPrefix}] ${normalizedIdentity}`
    const body = [
      `[${copy.mail.contextLabel}: v2-contact-handshake]`,
      `IDENTITY=${normalizedIdentity}`,
      `ENDPOINT_ADDRESS=${normalizedEndpoint}`,
      '',
      `[${copy.mail.payloadLabel}]`,
      copy.mail.defaultMessage,
    ].join('\n')

    const mailtoHref = `mailto:ksmartinez23@outlook.com?subject=${encodeMailtoValue(subject)}&body=${encodeMailtoValue(body)}`
    window.location.href = mailtoHref
  }

  return (
    <div className="border border-zinc-800 bg-[#080808] text-left shadow-[0_0_0_1px_rgba(255,124,245,0.06)]">
      <div className="flex items-center justify-between gap-4 border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        </div>
        <div className="font-label text-[10px] uppercase tracking-[0.28em] text-zinc-500">terminal://contact-protocol</div>
      </div>

      <div className="border-b border-zinc-800 px-4 py-3 font-label text-[10px] uppercase tracking-[0.2em] text-primary">
        <div>{copy.bootLine}</div>
        <div className="mt-1 text-zinc-500">{copy.helperLine}</div>
      </div>

      <form className="space-y-4 p-4 md:p-6" noValidate onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 group">
            <label className="block font-label text-[10px] text-zinc-500 tracking-widest uppercase mb-2" htmlFor="contact-identity">
              {copy.identityLabel}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-label">&gt;</span>
              <input
                id="contact-identity"
                aria-invalid={feedback?.type === 'error' && !identity.trim()}
                className="w-full bg-black border border-zinc-800 py-4 pl-10 pr-4 text-white focus:ring-0 focus:border-primary font-label text-xs placeholder:text-zinc-600"
                name="identity"
                onChange={(event) => setIdentity(event.target.value)}
                placeholder={copy.identityPlaceholder}
                type="text"
                value={identity}
              />
            </div>
          </div>
          <div className="flex-1 group">
            <label className="block font-label text-[10px] text-zinc-500 tracking-widest uppercase mb-2" htmlFor="contact-endpoint">
              {copy.endpointLabel}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-label">$</span>
              <input
                id="contact-endpoint"
                aria-invalid={feedback?.type === 'error' && endpointAddress.trim().length > 0 && !EMAIL_REGEX.test(endpointAddress.trim())}
                className="w-full bg-black border border-zinc-800 py-4 pl-10 pr-4 text-white focus:ring-0 focus:border-primary font-label text-xs placeholder:text-zinc-600"
                name="endpointAddress"
                onChange={(event) => setEndpointAddress(event.target.value)}
                placeholder={copy.endpointPlaceholder}
                type="email"
                value={endpointAddress}
              />
            </div>
          </div>
        </div>

        <div className="border border-dashed border-zinc-800 bg-black/70 px-4 py-3 font-label text-[10px] uppercase tracking-[0.18em] text-zinc-500">
          $ send_message --identity=&quot;{identity.trim() || copy.identityPlaceholder}&quot; --endpoint=&quot;{endpointAddress.trim() || copy.endpointPlaceholder}&quot;
        </div>

        {feedback ? (
          <p className={`font-label text-[10px] uppercase tracking-widest ${feedback.type === 'error' ? 'text-error' : 'text-primary'}`} role="status">
            [{feedback.message}]
          </p>
        ) : null}

        <button className="w-full bg-primary text-on-primary py-5 font-headline font-bold text-xl glitch-hover" type="submit">
          {copy.submitLabel}
        </button>

        <div className="font-label text-[10px] uppercase tracking-[0.22em] text-zinc-600 text-center">{copy.submitHint}</div>
      </form>
    </div>
  )
}
