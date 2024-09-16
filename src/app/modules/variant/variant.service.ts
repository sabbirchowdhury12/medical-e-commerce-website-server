import { IVariant } from './variant.interface'
import { Variant } from './variant.model'

const insertToDB = async (payload: IVariant): Promise<IVariant | null> => {
  const category = await Variant.create(payload)
  return category
}
const updateToDB = async (
  id: string,
  payload: Partial<IVariant>,
): Promise<IVariant | null> => {
  const category = await Variant.findByIdAndUpdate(id, payload, {
    new: true,
  }).exec()
  return category
}

const getAllFromDB = async (): Promise<IVariant[]> => {
  const categories = await Variant.find().exec()
  return categories
}

const getFromDB = async (id: string): Promise<IVariant | null> => {
  const result = await Variant.findOne({ id })
  return result
}

const deleteFromDB = async (id: string): Promise<IVariant | null> => {
  const result = await Variant.findByIdAndDelete(id).exec()
  return result
}

export const VariantService = {
  insertToDB,
  updateToDB,
  getAllFromDB,
  getFromDB,
  deleteFromDB,
}
