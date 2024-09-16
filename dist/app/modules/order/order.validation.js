"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = exports.ZOrderCreate = void 0;
const zod_1 = require("zod");
const ZOrderItem = zod_1.z.object({
    product: zod_1.z
        .string({ required_error: 'Product ID is required!' })
        .refine(val => /^[0-9a-fA-F]{24}$/.test(val), {
        message: 'Invalid Product ID',
    }),
    quantity: zod_1.z
        .number({ required_error: 'Quantity is required!' })
        .min(1, 'Quantity must be at least 1'),
    price: zod_1.z
        .number({ required_error: 'Price is required!' })
        .min(0, 'Price must be non-negative'),
});
const ZShippingAddress = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required!' }),
    phone: zod_1.z.string({ required_error: 'Phone number is required!' }),
    email: zod_1.z
        .string({ required_error: 'Email is required!' })
        .email('Invalid email address'),
    companyName: zod_1.z.string({ required_error: 'Company name is required!' }),
    division: zod_1.z.string({ required_error: 'Division is required!' }),
    district: zod_1.z.string({ required_error: 'District is required!' }),
    upazilla: zod_1.z.string({ required_error: 'Upazilla is required!' }),
    roadNo: zod_1.z.string({ required_error: 'Road No is required!' }),
    houseNo: zod_1.z.string({ required_error: 'House No is required!' }),
});
const ZPaymentInfo = zod_1.z.object({
    method: zod_1.z.enum(['Online', 'Cash'], {
        required_error: 'Payment method is required!',
    }),
    status: zod_1.z.enum(['Pending', 'Completed', 'Failed'], {
        required_error: 'Payment status is required!',
    }),
    transactionId: zod_1.z.string().optional(),
});
exports.ZOrderCreate = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z
            .string({ required_error: 'User ID is required!' })
            .refine(val => /^[0-9a-fA-F]{24}$/.test(val), {
            message: 'Invalid User ID',
        }),
        items: zod_1.z.array(ZOrderItem, { required_error: 'Order items are required!' }),
        totalAmount: zod_1.z
            .number({ required_error: 'Total amount is required!' })
            .min(0, 'Total amount must be non-negative'),
        status: zod_1.z
            .enum(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
            .optional(),
        shippingAddress: ZShippingAddress,
        paymentInfo: ZPaymentInfo,
    }),
});
exports.OrderValidation = {
    ZOrderCreate: exports.ZOrderCreate,
};
