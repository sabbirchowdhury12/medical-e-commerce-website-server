/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { IGenericErrorMessage } from '../../interfaces/error'
import ApiError from '../../errors/apiError'
import handleCastError from '../../errors/handleCastError'
import handleValidationError from '../../errors/handleValidationError'
import handleZodError from '../../errors/handleZodError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log('error name', error.name)

  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (error.name === 'ValidationError') {
    // Handle Mongoose validation errors
    statusCode = 400 // Bad Request
    message = 'Validation Error'
    errorMessages = Object.values(error.errors).map((err: any) => ({
      path: err.path,
      message: err.message,
    }))
  } else if (error?.name === 'validationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError?.statusCode || 400
    message = simplifiedError?.message || 'Validation Error'
    errorMessages = simplifiedError?.errorMessages || []
  } else if (error.name === 'CastError') {
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError?.statusCode || 400
    message = simplifiedError?.message || 'Cast Error'
    errorMessages = simplifiedError?.errorMessages || []
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError?.statusCode || 400
    message = simplifiedError?.message || 'Zod Error'
    errorMessages = simplifiedError?.errorMessages || []
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode || 500
    message = error?.message || 'API Error'
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message || 'Unknown Error'
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: process.env.NODE_ENV !== 'production' ? error?.stack : undefined,
  })
}

export default globalErrorHandler
