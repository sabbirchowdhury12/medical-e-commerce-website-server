import { VariantController } from './../category/category.controller'

import { Router } from 'express'

const router = Router()

router
  .post(
    '/create-variant',

    VariantController.insertToDB,
  )
  .patch(
    '/update-variant',

    VariantController.updateToDB,
  )
  .get('/', VariantController.updateToDB)
  .get('/:id', VariantController.updateToDB)
  .delete('/:id', VariantController.updateToDB)

export const authRoutes = router
