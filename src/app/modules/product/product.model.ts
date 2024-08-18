import mongoose, { Schema } from 'mongoose'
import { ProductDocument, ProductModel, Variant } from './product.inteface'

const VariantSchema = new Schema<Variant>({
  variantId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
})
const ProductSchema = new mongoose.Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    photos: { type: [String], required: true },
    description: { type: String, required: true },
    metaKey: { type: String, required: true },
    company: { type: String, required: true },
    discount: { type: Number, required: true },
    stockStatus: { type: Boolean, required: true },
    status: { type: String, enum: ['active', 'inactive'], required: true },
    categoryId: { type: Schema.Types.ObjectId, require: true },
    categoryName: { type: String, required: true },
    variants: { type: [VariantSchema], required: true },
    defaultPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)

export const Product = mongoose.model<ProductDocument, ProductModel>(
  'Product',
  ProductSchema,
)
