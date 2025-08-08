import 'server-only'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './env'

export type SignTokenPayload = {
  eid: string // envelope id
  email: string
}

export function signToken(payload: SignTokenPayload, ttlSeconds: number) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ttlSeconds })
}

export function verifyToken<T extends object = any>(token: string) {
  return jwt.verify(token, JWT_SECRET) as T
}
