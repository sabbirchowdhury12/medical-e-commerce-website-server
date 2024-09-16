import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { OrderDocument } from './order.interface'
import { OrderService } from './order.service'

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const data = await OrderService.insertToDB(req.body)

  sendResponse<OrderDocument>(res, {
    statusCode: 200,
    success: true,
    message: 'Order created successfully!',
    data,
  })
})

export const OrderController = {
  insertToDB,
}
