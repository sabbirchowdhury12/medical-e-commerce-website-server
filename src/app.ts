import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import router from './app/router'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

// Middlewares
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', router)
// Test Route
app.get('/test', async (req: Request, res: Response) => {
  res.json('The AutoX server is on 🔥 💧 🔥')
})

app.get('/test-error', (req, res, next) => {
  const error = new Error('Test error')
  console.log(error)
  next(error) // This should be caught by the global error handler
})

app.use(globalErrorHandler)

//api error handle
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found!',
    errorMessages: [{ path: req.originalUrl, message: 'API Not Found!' }],
  })
  next()
})

export default app
