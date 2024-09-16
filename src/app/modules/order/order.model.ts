import { model, Schema } from 'mongoose'
import { OrderDocument, OrderModel } from './order.interface'

const OrderItemSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
})

const OrderSchema: Schema<OrderDocument> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [OrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      companyName: { type: String, required: true },
      division: { type: String, required: true },
      district: { type: String, required: true },
      upazilla: { type: String, required: true },
      roadNo: { type: String, required: true },
      houseNo: { type: String, required: true },
    },
    paymentInfo: {
      method: {
        type: String,
        enum: ['Online', 'Cash'],
        required: true,
      },
      status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
      },
      transactionId: { type: String },
    },
  },
  {
    timestamps: true,
  },
)

const Order = model<OrderDocument, OrderModel>('Order', OrderSchema)

export default Order
