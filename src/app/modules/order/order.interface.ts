import { Document, Types, Model } from 'mongoose'

interface IOrderItem extends Document {
  product: Types.ObjectId
  quantity: number
  price: number
}

export interface OrderDocument extends Document {
  userId: Types.ObjectId
  items: IOrderItem[]
  totalAmount: number
  status?: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  shippingAddress: {
    name: string
    phone: string
    email: string
    compnayName: string
    division: string
    district: string
    upazilla: string
    roadNo: string
    houseNo: string
  }
  paymentInfo: {
    method: 'Online' | 'Cash'
    status: 'Pending' | 'Completed' | 'Failed'
    transactionId?: string
  }
}
export type OrderModel = Model<OrderDocument>
