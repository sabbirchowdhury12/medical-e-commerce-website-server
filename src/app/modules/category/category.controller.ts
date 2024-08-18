import { VariantService } from './Variant.service'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { VariantDocument } from './Variant.inteface'

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const data = await VariantService.insertToDB(req.body)

  sendResponse<VariantDocument>(res, {
    statusCode: 200,
    success: true,
    message: 'Variant created successfully!',
    data,
  })
})
const updateToDB = catchAsync(async (req: Request, res: Response) => {
  const data = await VariantService.updateToDB(req.params.id, req.body)

  sendResponse<VariantDocument>(res, {
    statusCode: 200,
    success: true,
    message: 'Variant updated successfully!',
    data,
  })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const data = await VariantService.getAllFromDB()

  sendResponse<VariantDocument[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Variants retrieved successfully!',
    data,
  })
})

const getFromDB = catchAsync(async (req: Request, res: Response) => {
  const data = await VariantService.getFromDB(req.params.id)

  sendResponse<VariantDocument>(res, {
    statusCode: 200,
    success: true,
    message: 'Variant retrieved successfully!',
    data,
  })
})

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const data = await VariantService.deleteFromDB(req.params.id)

  sendResponse<VariantDocument>(res, {
    statusCode: 200,
    success: true,
    message: 'Variant Deleted successfully!',
    data,
  })
})

export const VariantController = {
  insertToDB,
  updateToDB,
  getAllFromDB,
  getFromDB,
  deleteFromDB,
}
