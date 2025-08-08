import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const env = await prisma.envelope.findUnique({ where: { id } })
  if (!env) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const cert = {
    id: env.id,
    email: env.email,
    filename: env.filename,
    status: env.status,
    createdAt: env.createdAt,
    openedAt: env.openedAt,
    completedAt: env.completedAt,
    sha256: env.sha256
  }

  return NextResponse.json(cert)
}
