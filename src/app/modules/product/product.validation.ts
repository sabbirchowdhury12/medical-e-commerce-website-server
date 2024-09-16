import { z } from 'zod'

export const ZProductCreate = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required!' }),
    slug: z.string({ required_error: 'Slug is required!' }),
    photos: z.array(z.string(), { required_error: 'Photos are required!' }),
    description: z.string({ required_error: 'Description is required!' }),
    metaKey: z.string({ required_error: 'Meta key is required!' }),
    company: z.string({ required_error: 'Company name is required!' }),
    discount: z.number({ required_error: 'Discount is required!' }),
    stockStatus: z.boolean({ required_error: 'Stock status is required!' }),
    categoryId: z.string({ required_error: 'Category ID is required!' }),
    categoryName: z.string({ required_error: 'Category name is required!' }),
    subCategory: z.string({ required_error: 'Sub-Category name is required!' }),
    variants: z.array(z.any(), { required_error: 'Variants are required!' }),
    defaultPrice: z.number({ required_error: 'Default price is required!' }),
  }),
})
export const ZProductUpdate = z.object({
  body: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    photos: z.array(z.string()).optional(),
    description: z.string().optional(),
    metaKey: z.string().optional(),
    company: z.string().optional(),
    discount: z.number().optional(),
    stockStatus: z.boolean().optional(),
    status: z.enum(['active', 'inactive']).optional(),
    categoryId: z
      .string()
      .optional()
      .refine(val => !val || /^[0-9a-fA-F]{24}$/.test(val), {
        message: 'Invalid Category ID',
      }),
    categoryName: z.string().optional(),
    variants: z.array(z.any()).optional(), // Replace `z.any()` with actual variant schema validation if needed
    defaultPrice: z.number().optional(),
  }),
})

export const AuthValidation = {
  ZProductCreate,
  ZProductUpdate,
}
