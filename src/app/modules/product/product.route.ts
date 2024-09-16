import { ProductController } from './product.controller'
import { Router } from 'express'
import { ZProductCreate, ZProductUpdate } from './product.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = Router()

router
  .post('/', validateRequest(ZProductCreate), ProductController.insertToDB)
  .patch('/', validateRequest(ZProductUpdate), ProductController.updateToDB)
  .get('/', ProductController.getAllFromDB)
  .get('/category/:id', ProductController.getByCategory)
  // .get('/sub-categry', ProductController.getBySubCategory)
  .get('/:id', ProductController.getFromDB)
  .delete('/:id', ProductController.deleteFromDB)

export const productRoutes = router
