import { Document, Model, Schema } from 'mongoose'

export interface IVariant {
  variantId: string
  name: string
  price: number
}
export interface ProductDocument extends Document {
  name: string
  slug: string
  photos: string[]
  description: string
  metaKey: string
  discount: number
  company: string
  stockStatus: boolean
  status: 'active' | 'inactive'
  categoryId: Schema.Types.ObjectId
  categoryName: string
  variants: IVariant[]
  defaultPrice: number
}

export type ProductModel = Model<ProductDocument>
