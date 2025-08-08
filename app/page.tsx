import Link from 'next/link'

export default function Home() {
  return (
    <main className="container">
      <h1>eSignLite</h1>
      <p>Upload a PDF, send a magic link, sign in the browser, and get an audit trail.</p>
      <Link href="/upload" className="button">Create envelope</Link>
    </main>
  )
}
