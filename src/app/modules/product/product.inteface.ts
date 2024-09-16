import { Schema, Document, Model } from 'mongoose'
import { IVariant } from '../variant/variant.interface'

// Product Interface
export interface ProductDocument extends Document {
  name: string
  slug: string
  photos: string[]
  description: string
  metaKey: string
  discount: number
  company: string
  stockStatus: boolean
  categoryId: Schema.Types.ObjectId
  categoryName: string
  subCategory: string
  variants: Schema.Types.ObjectId[] | IVariant[]
  defaultPrice: number
}

export type ProductModel = Model<ProductDocument>

export type IProductFilters = {
  searchTerm?: string
}
