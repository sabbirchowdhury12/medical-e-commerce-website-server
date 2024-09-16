"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    photos: { type: [String], required: true },
    description: { type: String, required: true },
    metaKey: { type: String, required: true },
    company: { type: String, required: true },
    discount: { type: Number, required: true },
    stockStatus: { type: Boolean, required: true },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Categories' },
    categoryName: { type: String, required: true },
    subCategory: { type: String, required: true },
    variants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Variant' }], // Correct reference
    defaultPrice: { type: Number, required: true },
}, {
    timestamps: true,
});
// Model
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
