import { model, Schema } from 'mongoose'
import { ProductDocument, ProductModel } from './product.inteface'

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    photos: { type: [String], required: true },
    description: { type: String, required: true },
    metaKey: { type: String, required: true },
    company: { type: String, required: true },
    discount: { type: Number, required: true },
    stockStatus: { type: Boolean, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Categories' },
    categoryName: { type: String, required: true },
    subCategory: { type: String, required: true },
    variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }], // Correct reference
    defaultPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)

// Model
export const Product = model<ProductDocument, ProductModel>(
  'Product',
  ProductSchema,
)
