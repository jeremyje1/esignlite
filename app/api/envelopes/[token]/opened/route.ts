import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'

function getIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for') || (req as any).ip || 'unknown'
}

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  const { eid } = verifyToken<{ eid: string }>(params.token)
  const ua = req.headers.get('user-agent') || 'unknown'
  const ip = getIp(req)

  const env = await prisma.envelope.findUnique({ where: { id: eid } })
  if (!env) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (env.status === 'COMPLETED') return NextResponse.json({ ok: true })

  await prisma.envelope.update({
    where: { id: eid },
    data: { status: 'OPENED', openedAt: env.openedAt ?? new Date(), openedIp: env.openedIp ?? ip, openedUa: env.openedUa ?? ua }
  })

  return NextResponse.json({ ok: true })
}
