import 'server-only'

function requireEnv(name: string, optional = false) {
  const v = process.env[name]
  if (!v && !optional) {
    throw new Error(`Missing env var ${name}`)
  }
  return v as string
}

export const APP_URL = requireEnv('APP_URL')
export const JWT_SECRET = requireEnv('JWT_SECRET')

// Optional: email provider
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
export const MAIL_FROM = process.env.MAIL_FROM

// Optional: Supabase (not used yet)
export const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
export const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
export const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET
