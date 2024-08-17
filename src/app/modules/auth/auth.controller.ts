import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AuthService } from './auth.service'
import config from '../../../config'
import sendResponse from '../../../shared/sendResponse'
import { TLoginResponse, TRegisterResponse } from './auth.interface'

const register = catchAsync(async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await AuthService.register(
    req.body,
  )

  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'production',
    httpOnly: true,
  })

  sendResponse<Omit<TRegisterResponse, 'refreshToken'>>(res, {
    statusCode: 200,
    success: true,
    message: 'User registered successfully!',
    data: { accessToken, user },
    meta: null,
  })
})
const login = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await AuthService.login(req.body)

  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'production',
    httpOnly: true,
  })

  sendResponse<Omit<TLoginResponse, 'refreshToken'>>(res, {
    statusCode: 200,
    success: true,
    message: 'User login successfully',
    data: { accessToken },
    meta: null,
  })
})

export const AuthController = { register, login }
