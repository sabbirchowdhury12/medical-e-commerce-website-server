import { z } from 'zod'

export const ZCategoryCreate = z.object({
  body: z.object({
    title: z.string({ required_error: 'Password is required!' }),
    slug: z.string({ required_error: 'Password is required!' }),
  }),
})
export const ZCategoryUpdate = z.object({
  body: z.object({
    title: z.string({ required_error: 'Password is required!' }).optional(),
    slug: z.string({ required_error: 'Password is required!' }).optional(),
  }),
})

export const AuthValidation = {
  ZCategoryCreate,
  ZCategoryUpdate,
}
