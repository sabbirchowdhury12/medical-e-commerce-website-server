import { Router } from 'express'

import validateRequest from '../../middlewares/validateRequest'
import { ZCategoryCreate, ZCategoryUpdate } from './category.validation'
import { CategoryService } from './category.service'

const router = Router()

router
  .post(
    '/create-category',
    validateRequest(ZCategoryCreate),
    CategoryService.insertToDB,
  )
  .patch(
    '/update-category',
    validateRequest(ZCategoryUpdate),
    CategoryService.updateToDB,
  )
  .get('/', CategoryService.updateToDB)
  .get('/:id', CategoryService.updateToDB)
  .delete('/:id', CategoryService.updateToDB)

export const authRoutes = router
