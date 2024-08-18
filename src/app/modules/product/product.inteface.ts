import { Document, Model, Schema } from 'mongoose'

export interface Variant {
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
  variants: Variant[]
  defaultPrice: number
}

export type ProductModel = Model<ProductDocument>
