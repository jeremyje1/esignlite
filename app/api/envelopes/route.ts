import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendMagicLinkEmail } from '@/lib/mailer'
import { signToken } from '@/lib/jwt'
import { APP_URL } from '@/lib/env'
import path from 'path'
import fs from 'fs/promises'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const email = formData.get('email') as string | null

  if (!file || !email) {
    return NextResponse.json({ error: 'Missing file or email' }, { status: 400 })
  }

  if ((file as any).type !== 'application/pdf') {
    return NextResponse.json({ error: 'Only PDF allowed' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const filename = `${Date.now()}-${file.name}`
  const uploadDir = path.join(process.cwd(), 'storage')
  await fs.mkdir(uploadDir, { recursive: true })
  const filePath = path.join(uploadDir, filename)
  await fs.writeFile(filePath, buffer)

  const env = await prisma.envelope.create({
    data: { email, filename, filePath }
  })

  const token = signToken({ eid: env.id, email }, 60 * 60 * 24) // 24h
  const link = `${APP_URL}/sign/${token}`

  try {
    await sendMagicLinkEmail(email, link)
  } catch (e) {
    console.warn('Send email failed (ok in dev):', e)
  }

  return NextResponse.json({ id: env.id })
}
