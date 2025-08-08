import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'
import { stampSignatureAndHash } from '@/lib/pdf'
import path from 'path'

export const runtime = 'nodejs'

function getIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for') || (req as any).ip || 'unknown'
}

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  let eid: string
  try {
    ;({ eid } = verifyToken<{ eid: string }>(params.token))
  } catch {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
  }

  const body = await req.json()
  const name = body?.name as string
  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 })

  const env = await prisma.envelope.findUnique({ where: { id: eid } })
  if (!env) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (env.status === 'COMPLETED') return NextResponse.json({ error: 'Already completed' }, { status: 400 })

  const outPath = path.join(path.dirname(env.filePath), `signed-${env.filename}`)
  const { sha256 } = await stampSignatureAndHash(env.filePath, outPath, { name })

  const ua = req.headers.get('user-agent') || 'unknown'
  const ip = getIp(req)

  await prisma.envelope.update({
    where: { id: eid },
    data: {
      status: 'COMPLETED',
      completedAt: new Date(),
      completedIp: ip,
      completedUa: ua,
      sha256,
      consent: true
    }
  })

  return NextResponse.json({ ok: true, sha256 })
}
