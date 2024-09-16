"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = exports.ZCategoryUpdate = exports.ZCategoryCreate = void 0;
const zod_1 = require("zod");
exports.ZCategoryCreate = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title is required!' }),
        slug: zod_1.z.string({ required_error: 'slug is required!' }),
    }),
});
exports.ZCategoryUpdate = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'title is required!' }).optional(),
        slug: zod_1.z.string({ required_error: 'slug is required!' }).optional(),
    }),
});
exports.AuthValidation = {
    ZCategoryCreate: exports.ZCategoryCreate,
    ZCategoryUpdate: exports.ZCategoryUpdate,
};
