/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from './product.model'
import { IProductFilters, ProductDocument } from './product.inteface'
import { productSearchableFields } from './product.constant'
import { FilterQuery, SortOrder } from 'mongoose'
import { pagination } from '../../../helper/pagination'

const insertToDB = async (
  payload: ProductDocument,
): Promise<ProductDocument | null> => {
  const result = await Product.create(payload)
  return result
}
const updateToDB = async (
  id: string,
  payload: Partial<ProductDocument>,
): Promise<ProductDocument | null> => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  }).exec()
  return result
}

const getAllFromDB = async (
  filters: IProductFilters,
  paginationOptions,
): Promise<any> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions: FilterQuery<ProductDocument>[] = []

  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map(element => ({
        [element]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    pagination.calculatePagination(paginationOptions)

  const sortConditions: { [key: string | number]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const total = await Product.countDocuments()
  const whereConditon = andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Product.find(whereConditon)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  return {
    meta: {
      page,
      limit,
      total,
      skip,
    },
    data: result,
  }
}
const getByCategory = async (id: string): Promise<ProductDocument[]> => {
  const result = await Product.find({ categoryId: id }).exec()
  return result
}
const getBySubCategory = async (id: string): Promise<ProductDocument[]> => {
  const result = await Product.find({ categoryId: id }).exec()
  return result
}

const getFromDB = async (id: string): Promise<ProductDocument | null> => {
  try {
    const result = await Product.findById(id).populate('variants').exec()
    return result
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error)
    return null
  }
}

const deleteFromDB = async (id: string): Promise<ProductDocument | null> => {
  const result = await Product.findByIdAndDelete(id).exec()
  return result
}

export const ProductService = {
  insertToDB,
  updateToDB,
  getAllFromDB,
  getFromDB,
  deleteFromDB,
  getByCategory,
  getBySubCategory,
}
