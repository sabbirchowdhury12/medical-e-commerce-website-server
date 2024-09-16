import { CategoryService } from './category.service'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CategoryDocument } from './category.inteface'

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const data = await CategoryService.insertToDB(req.body)

  sendResponse<CategoryDocument>(res, {
    statusCode: 200,
    success: true,
    message: 'Category created successfully!',
    data,
  })
})
const updateToDB = catchAsync(async (req: Request, res: Response) => {
  const data = await CategoryService.updateToDB(req.params.id, req.body)

  sendResponse<CategoryDocument>(res, {
    statusCode: 200,
    success: true,
    message: 'Category updated successfully!',
    data,
  })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const data = await CategoryService.getAllFromDB()

  sendResponse<CategoryDocument[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Categorys retrieved successfully!',
    data,
  })
})

const getFromDB = catchAsync(async (req: Request, res: Response) => {
  const data = await CategoryService.getFromDB(req.params.id)

  sendResponse<CategoryDocument>(res, {
    statusCode: 200,
    success: true,
    message: 'Category retrieved successfully!',
    data,
  })
})

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const data = await CategoryService.deleteFromDB(req.params.id)

  sendResponse<CategoryDocument>(res, {
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
