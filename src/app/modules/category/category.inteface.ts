import { Document, Model } from 'mongoose'

export interface CategoryDocument extends Document {
  categoryId: string
  categoryName: string
  title: string
  slug: string
}

export type CategoryModel = Model<CategoryDocument>
