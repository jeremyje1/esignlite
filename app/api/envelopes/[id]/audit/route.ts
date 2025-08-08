import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const env = await prisma.envelope.findUnique({ where: { id: params.id } })
  if (!env) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({
    id: env.id,
    status: env.status,
    createdAt: env.createdAt,
    openedAt: env.openedAt,
    openedIp: env.openedIp,
    openedUa: env.openedUa,
    completedAt: env.completedAt,
    completedIp: env.completedIp,
    completedUa: env.completedUa,
    sha256: env.sha256,
    consent: env.consent
  })
}
