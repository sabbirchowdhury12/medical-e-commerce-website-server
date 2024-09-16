"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variant = void 0;
const mongoose_1 = require("mongoose");
const VariantSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});
// Model
exports.Variant = (0, mongoose_1.model)('Variant', VariantSchema);
