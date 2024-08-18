import { model, Schema } from 'mongoose'
import { CategoryDocument, CategoryModel } from './category.inteface'

const CategorySchema = new Schema<CategoryDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
)

const Category = model<CategoryDocument, CategoryModel>(
  'Category',
  CategorySchema,
)

export default Category
