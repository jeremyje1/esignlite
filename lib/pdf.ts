import { PDFDocument, rgb } from 'pdf-lib'
import crypto from 'crypto'
import fs from 'fs/promises'

// TODO: swap local FS to S3 for storage in production.

export type SignatureInput = {
  name: string
  reason?: string
}

export async function stampSignatureAndHash(inputPdfPath: string, outputPdfPath: string, sig: SignatureInput) {
  const data = await fs.readFile(inputPdfPath)
  const pdfDoc = await PDFDocument.load(data)
  const pages = pdfDoc.getPages()
  const first = pages[0]

  first.drawText(`Signed by: ${sig.name}`, {
    x: 50,
    y: 100,
    size: 12,
    color: rgb(0, 0, 0)
  })
  if (sig.reason) {
    first.drawText(`Reason: ${sig.reason}`, { x: 50, y: 85, size: 10, color: rgb(0.2, 0.2, 0.2) })
  }
  const stamped = await pdfDoc.save()
  await fs.writeFile(outputPdfPath, stamped)

  const hash = crypto.createHash('sha256').update(stamped).digest('hex')
  return { sha256: hash }
}
