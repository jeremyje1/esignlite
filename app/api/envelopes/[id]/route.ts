import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const env = await prisma.envelope.findUnique({ where: { id: params.id } })
  if (!env) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(env)
}
