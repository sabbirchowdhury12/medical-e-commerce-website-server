import { z } from 'zod'

const ZOrderItem = z.object({
  product: z
    .string({ required_error: 'Product ID is required!' })
    .refine(val => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'Invalid Product ID',
    }),
  quantity: z
    .number({ required_error: 'Quantity is required!' })
    .min(1, 'Quantity must be at least 1'),
  price: z
    .number({ required_error: 'Price is required!' })
    .min(0, 'Price must be non-negative'),
})

const ZShippingAddress = z.object({
  name: z.string({ required_error: 'Name is required!' }),
  phone: z.string({ required_error: 'Phone number is required!' }),
  email: z
    .string({ required_error: 'Email is required!' })
    .email('Invalid email address'),
  companyName: z.string({ required_error: 'Company name is required!' }),
  division: z.string({ required_error: 'Division is required!' }),
  district: z.string({ required_error: 'District is required!' }),
  upazilla: z.string({ required_error: 'Upazilla is required!' }),
  roadNo: z.string({ required_error: 'Road No is required!' }),
  houseNo: z.string({ required_error: 'House No is required!' }),
})

const ZPaymentInfo = z.object({
  method: z.enum(['Online', 'Cash'], {
    required_error: 'Payment method is required!',
  }),
  status: z.enum(['Pending', 'Completed', 'Failed'], {
    required_error: 'Payment status is required!',
  }),
  transactionId: z.string().optional(),
})

export const ZOrderCreate = z.object({
  body: z.object({
    user: z
      .string({ required_error: 'User ID is required!' })
      .refine(val => /^[0-9a-fA-F]{24}$/.test(val), {
        message: 'Invalid User ID',
      }),
    items: z.array(ZOrderItem, { required_error: 'Order items are required!' }),
    totalAmount: z
      .number({ required_error: 'Total amount is required!' })
      .min(0, 'Total amount must be non-negative'),
    status: z
      .enum(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
      .optional(),
    shippingAddress: ZShippingAddress,
    paymentInfo: ZPaymentInfo,
  }),
})

export const OrderValidation = {
  ZOrderCreate,
}
