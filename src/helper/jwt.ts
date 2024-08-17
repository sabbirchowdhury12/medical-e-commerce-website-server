/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../config'
import { JwtPayload, Secret, sign, verify } from 'jsonwebtoken'

import httpStatus from 'http-status'
import ApiError from '../errors/apiError'

export interface VerifiedUser extends JwtPayload {
  id: string
  role: string
  // Add other properties if needed
}

const createToken = (
  payload: Record<string, unknown>,
  tokenType: 'access' | 'refresh',
): string => {
  if (tokenType === 'access') {
    return sign(payload, config.jwt.secret as Secret, {
      expiresIn: config.jwt.expires_in,
    })
  } else {
    return sign(payload, config.jwt.refresh_secret as Secret, {
      expiresIn: config.jwt.refresh_expires_in,
    })
  }
}

const verifyToken = (token: string, secret: Secret): VerifiedUser => {
  try {
    return verify(token, secret) as VerifiedUser
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token')
  }
}

export { createToken, verifyToken }
