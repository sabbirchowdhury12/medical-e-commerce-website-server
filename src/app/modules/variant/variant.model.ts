import { model, Schema } from 'mongoose'
import { IVariant } from './variant.interface'

const VariantSchema = new Schema<IVariant>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
})

// Model
export const Variant = model<IVariant>('Variant', VariantSchema)
