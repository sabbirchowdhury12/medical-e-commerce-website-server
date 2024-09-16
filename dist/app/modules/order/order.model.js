"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderItemSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});
const OrderSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
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
}, {
    timestamps: true,
});
const Order = (0, mongoose_1.model)('Order', OrderSchema);
exports.default = Order;
