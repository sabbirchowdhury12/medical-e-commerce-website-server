import { model, Schema } from 'mongoose'
import { CategoryDocument, CategoryModel } from './category.inteface'

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subCategory: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  },
)

const Category = model<CategoryDocument, CategoryModel>(
  'Categories',
  CategorySchema,
)

export default Category
