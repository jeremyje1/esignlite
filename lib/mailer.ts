import 'server-only'
import sgMail from '@sendgrid/mail'
import { MAIL_FROM, SENDGRID_API_KEY } from './env'

const hasSendgrid = !!SENDGRID_API_KEY && !!MAIL_FROM
if (hasSendgrid) {
  sgMail.setApiKey(SENDGRID_API_KEY as string)
}

export async function sendMagicLinkEmail(to: string, link: string) {
  if (!hasSendgrid) {
    console.log('SendGrid not configured. Magic link:', link)
    return
  }
  await sgMail.send({
    to,
    from: MAIL_FROM as string,
    subject: 'Sign your document',
    html: `<p>Click the link to sign: <a href="${link}">${link}</a></p>`
  })
}
