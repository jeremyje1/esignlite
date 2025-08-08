'use client'

import { useEffect, useState } from 'react'

export default function SignPage({ params }: { params: { token: string } }) {
  const [name, setName] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Ping opened status
    fetch(`/api/envelopes/${params.token}/opened`, { method: 'POST' }).catch(() => {})
  }, [params.token])

  async function handleFinish() {
    setError(null)
    if (!consent) {
      setError('You must consent to continue')
      return
    }
    setLoading(true)
    const res = await fetch(`/api/envelopes/${params.token}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    const json = await res.json()
    setLoading(false)
    if (!res.ok) {
      setError(json.error || 'Failed to complete')
      return
    }
    alert('Signed! You can fetch audit trail from API.')
  }

  return (
    <main className="container">
      <h1>Sign Document</h1>
      <div>
        <label>Your Full Name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          I agree to use electronic signature and consent to do business electronically.
        </label>
        <button disabled={!consent || loading || !name} onClick={handleFinish}>
          {loading ? 'Finishing...' : 'Finish signing'}
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </main>
  )
}
