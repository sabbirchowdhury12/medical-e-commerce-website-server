import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ProductService } from './product.service'
import { ProductDocument } from './product.inteface'
import pick from '../../../shared/pick'
import { productFilterableFields } from './product.constant'
import { paginationFields } from '../../../helper/pagination'

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const data = await ProductService.insertToDB(req.body)

  sendResponse<ProductDocument>(res, {
    statusCode: 200,
    success: true,
    message: 'Product created successfully!',
    data,
  })
})
const updateToDB = catchAsync(async (req: Request, res: Response) => {
  const data = await ProductService.updateToDB(req.params.id, req.body)

  sendResponse<ProductDocument>(res, {
    statusCode: 200,
    success: true,
    message: 'Product updated successfully!',
    data,
  })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await ProductService.getAllFromDB(filters, paginationOptions)
  sendResponse<ProductDocument[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Products retrieved successfully!',
    data: result.data,
    meta: result.meta,
  })
})

const getByCategory = catchAsync(async (req: Request, res: Response) => {
  const data = await ProductService.getByCategory(req.params.id)

  sendResponse<ProductDocument[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Products retrieved successfully!',
    data,
  })
})

const getFromDB = catchAsync(async (req: Request, res: Response) => {
  const data = await ProductService.getFromDB(req.params.id)

  sendResponse<ProductDocument>(res, {
    statusCode: 200,
    success: true,
    message: 'Product retrieved successfully!',
    data,
  })
})

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const data = await ProductService.deleteFromDB(req.params.id)

  sendResponse<ProductDocument>(res, {
    statusCode: 200,
    success: true,
    message: 'Product Deleted successfully!',
    data,
  })
})

export const ProductController = {
  insertToDB,
  updateToDB,
  getAllFromDB,
  getFromDB,
  deleteFromDB,
  getByCategory,
}
