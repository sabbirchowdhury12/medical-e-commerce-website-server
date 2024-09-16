import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ZCategoryCreate, ZCategoryUpdate } from './category.validation'
import { CategoryController } from './category.controller'

const router = Router()

router
  .post('/', validateRequest(ZCategoryCreate), CategoryController.insertToDB)
  .get('/', CategoryController.getAllFromDB)
  .get('/:id', CategoryController.getFromDB)
  .patch(
    '/:id',
    validateRequest(ZCategoryUpdate),
    CategoryController.updateToDB,
  )
  .delete('/:id', CategoryController.deleteFromDB)

export const categoryRoutes = router
