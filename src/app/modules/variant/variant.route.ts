import { Router } from 'express'
import { VariantController } from './variant.controller'

const router = Router()

router
  .post(
    '',

    VariantController.insertToDB,
  )
  .patch(
    '',

    VariantController.updateToDB,
  )
  .get('/', VariantController.getAllFromDB)
  .get('/:id', VariantController.getFromDB)
  .delete('/:id', VariantController.deleteFromDB)

export const variantRoutes = router
