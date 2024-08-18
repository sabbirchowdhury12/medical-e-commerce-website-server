import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IVariant } from '../product/product.inteface'
import { VariantService } from './variant.service'

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const data = await VariantService.insertToDB(req.body)

  sendResponse<IVariant>(res, {
    statusCode: 200,
    success: true,
    message: 'Category created successfully!',
    data,
  })
})
const updateToDB = catchAsync(async (req: Request, res: Response) => {
  const data = await VariantService.updateToDB(req.params.id, req.body)

  sendResponse<IVariant>(res, {
    statusCode: 200,
    success: true,
    message: 'Category updated successfully!',
    data,
  })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const data = await VariantService.getAllFromDB()

  sendResponse<IVariant[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Categorys retrieved successfully!',
    data,
  })
})

const getFromDB = catchAsync(async (req: Request, res: Response) => {
  const data = await VariantService.getFromDB(req.params.id)

  sendResponse<IVariant>(res, {
    statusCode: 200,
    success: true,
    message: 'Category retrieved successfully!',
    data,
  })
})

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const data = await VariantService.deleteFromDB(req.params.id)

  sendResponse<IVariant>(res, {
    statusCode: 200,
    success: true,
    message: 'Category Deleted successfully!',
    data,
  })
})

export const CategoryController = {
  insertToDB,
  updateToDB,
  getAllFromDB,
  getFromDB,
  deleteFromDB,
}
