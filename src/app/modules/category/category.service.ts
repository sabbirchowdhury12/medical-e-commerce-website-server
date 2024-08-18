import { CategoryDocument } from './category.inteface'
import Category from './category.model'

const insertToDB = async (
  payload: CategoryDocument,
): Promise<CategoryDocument | null> => {
  const category = await Category.create(payload)
  return category
}
const updateToDB = async (
  id: string,
  payload: Partial<CategoryDocument>,
): Promise<CategoryDocument | null> => {
  const category = await Category.findByIdAndUpdate(id, payload, {
    new: true,
  }).exec()
  return category
}

const getAllFromDB = async (): Promise<CategoryDocument[]> => {
  const categories = await Category.find().exec()
  return categories
}

const getFromDB = async (id: string): Promise<CategoryDocument | null> => {
  const result = await Category.findOne({ id })
  return result
}

const deleteFromDB = async (id: string): Promise<CategoryDocument | null> => {
  const result = await Category.findByIdAndDelete(id).exec()
  return result
}

export const CategoryService = {
  insertToDB,
  updateToDB,
  getAllFromDB,
  getFromDB,
  deleteFromDB,
}
