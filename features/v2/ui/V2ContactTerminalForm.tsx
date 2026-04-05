'use client'

import { type FormEvent, useState } from 'react'

type FeedbackType = 'error' | 'success'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function encodeMailtoValue(value: string): string {
  return encodeURIComponent(value)
}

export function V2ContactTerminalForm() {
  const [identity, setIdentity] = useState('')
  const [endpointAddress, setEndpointAddress] = useState('')
  const [feedback, setFeedback] = useState<{ type: FeedbackType; message: string } | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedIdentity = identity.trim()
    const normalizedEndpoint = endpointAddress.trim()

    if (!normalizedIdentity) {
      setFeedback({ type: 'error', message: 'ERROR::IDENTITY_REQUIRED' })
      return
    }

    if (!EMAIL_REGEX.test(normalizedEndpoint)) {
      setFeedback({ type: 'error', message: 'ERROR::ENDPOINT_ADDRESS_INVALID' })
      return
    }

    setFeedback({ type: 'success', message: 'HANDSHAKE_OK::LAUNCHING_MAIL_CLIENT' })

    const subject = `[V2_HANDSHAKE] ${normalizedIdentity}`
    const body = [
      '[TERMINAL_CONTEXT: v2-contact-handshake]',
      `IDENTITY=${normalizedIdentity}`,
      `ENDPOINT_ADDRESS=${normalizedEndpoint}`,
      '',
      '[MESSAGE_PAYLOAD]',
      'Hola Kevin, vengo desde el terminal de contacto v2.',
    ].join('\n')

    const mailtoHref = `mailto:ksmartinez23@outlook.com?subject=${encodeMailtoValue(subject)}&body=${encodeMailtoValue(body)}`
    window.location.href = mailtoHref
  }

  return (
    <form className="space-y-4" noValidate onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-label">&gt;</span>
          <input
            aria-invalid={feedback?.type === 'error' && !identity.trim()}
            className="w-full bg-surface-container border border-outline-variant/20 py-4 pl-10 pr-4 text-white focus:ring-0 focus:border-primary font-label text-xs"
            name="identity"
            onChange={(event) => setIdentity(event.target.value)}
            placeholder="IDENTITY"
            type="text"
            value={identity}
          />
        </div>
        <div className="flex-1 relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-label">$</span>
          <input
            aria-invalid={feedback?.type === 'error' && endpointAddress.trim().length > 0 && !EMAIL_REGEX.test(endpointAddress.trim())}
            className="w-full bg-surface-container border border-outline-variant/20 py-4 pl-10 pr-4 text-white focus:ring-0 focus:border-primary font-label text-xs"
            name="endpointAddress"
            onChange={(event) => setEndpointAddress(event.target.value)}
            placeholder="ENDPOINT_ADDRESS"
            type="email"
            value={endpointAddress}
          />
        </div>
      </div>

      {feedback ? (
        <p className={`font-label text-[10px] uppercase tracking-widest ${feedback.type === 'error' ? 'text-error' : 'text-primary'}`} role="status">
          [{feedback.message}]
        </p>
      ) : null}

      <button className="w-full bg-primary text-on-primary py-5 font-headline font-bold text-xl glitch-hover" type="submit">SEND_MESSAGE</button>
    </form>
  )
}
