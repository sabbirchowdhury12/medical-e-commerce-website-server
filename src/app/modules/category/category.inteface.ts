import { Document, Model } from 'mongoose'

export interface CategoryDocument extends Document {
  name: string
  slug: string
  subCategory: string[]
}

export type CategoryModel = Model<CategoryDocument>
