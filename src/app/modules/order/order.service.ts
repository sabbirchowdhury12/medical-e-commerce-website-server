import { OrderDocument } from './order.interface'
import Order from './order.model'

const insertToDB = async (
  payload: OrderDocument,
): Promise<OrderDocument | null> => {
  const result = await Order.create(payload)
  return result
}

export const OrderService = {
  insertToDB,
}
