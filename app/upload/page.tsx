'use client'

import { useState } from 'react'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!file) {
      setError('Please select a PDF')
      return
    }
    setLoading(true)
    const form = new FormData()
    form.append('file', file)
    form.append('email', email)

    const res = await fetch('/api/envelopes', { method: 'POST', body: form })
    const json = await res.json()
    setLoading(false)
    if (!res.ok) {
      setError(json.error || 'Failed to create envelope')
      return
    }
    alert('Envelope created. Magic link sent if email provider configured.')
  }

  return (
    <main className="container">
      <h1>Create Envelope</h1>
      <form onSubmit={onSubmit}>
        <label>PDF File
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>
        <label>Signer Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button disabled={loading}>{loading ? 'Creating...' : 'Create & Send'}</button>
      </form>
    </main>
  )
}
