"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = exports.ZProductUpdate = exports.ZProductCreate = void 0;
const zod_1 = require("zod");
exports.ZProductCreate = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required!' }),
        slug: zod_1.z.string({ required_error: 'Slug is required!' }),
        photos: zod_1.z.array(zod_1.z.string(), { required_error: 'Photos are required!' }),
        description: zod_1.z.string({ required_error: 'Description is required!' }),
        metaKey: zod_1.z.string({ required_error: 'Meta key is required!' }),
        company: zod_1.z.string({ required_error: 'Company name is required!' }),
        discount: zod_1.z.number({ required_error: 'Discount is required!' }),
        stockStatus: zod_1.z.boolean({ required_error: 'Stock status is required!' }),
        categoryId: zod_1.z.string({ required_error: 'Category ID is required!' }),
        categoryName: zod_1.z.string({ required_error: 'Category name is required!' }),
        subCategory: zod_1.z.string({ required_error: 'Sub-Category name is required!' }),
        variants: zod_1.z.array(zod_1.z.any(), { required_error: 'Variants are required!' }),
        defaultPrice: zod_1.z.number({ required_error: 'Default price is required!' }),
    }),
});
exports.ZProductUpdate = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        slug: zod_1.z.string().optional(),
        photos: zod_1.z.array(zod_1.z.string()).optional(),
        description: zod_1.z.string().optional(),
        metaKey: zod_1.z.string().optional(),
        company: zod_1.z.string().optional(),
        discount: zod_1.z.number().optional(),
        stockStatus: zod_1.z.boolean().optional(),
        status: zod_1.z.enum(['active', 'inactive']).optional(),
        categoryId: zod_1.z
            .string()
            .optional()
            .refine(val => !val || /^[0-9a-fA-F]{24}$/.test(val), {
            message: 'Invalid Category ID',
        }),
        categoryName: zod_1.z.string().optional(),
        variants: zod_1.z.array(zod_1.z.any()).optional(), // Replace `z.any()` with actual variant schema validation if needed
        defaultPrice: zod_1.z.number().optional(),
    }),
});
exports.AuthValidation = {
    ZProductCreate: exports.ZProductCreate,
    ZProductUpdate: exports.ZProductUpdate,
};
