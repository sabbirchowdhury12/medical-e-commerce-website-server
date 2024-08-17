import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../config'
import ApiError from '../../errors/apiError'
import { VerifiedUser, verifyToken } from '../../helper/jwt'

declare module 'express-serve-static-core' {
  interface Request {
    user?: VerifiedUser
  }
}

function auth(...requiredRoles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get authorization token
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }

      // Verify token
      const verifiedUser = verifyToken(token, config.jwt.secret as Secret)

      if (!verifiedUser) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'Invalid token or token verification failed!',
        )
      }

      // Set user information in req
      req.user = verifiedUser

      // Role-based access control
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

export default auth
