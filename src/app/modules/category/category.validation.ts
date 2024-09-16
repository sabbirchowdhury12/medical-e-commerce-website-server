import { z } from 'zod'

export const ZCategoryCreate = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required!' }),
    slug: z.string({ required_error: 'slug is required!' }),
  }),
})
export const ZCategoryUpdate = z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required!' }).optional(),
    slug: z.string({ required_error: 'slug is required!' }).optional(),
  }),
})

export const AuthValidation = {
  ZCategoryCreate,
  ZCategoryUpdate,
}
