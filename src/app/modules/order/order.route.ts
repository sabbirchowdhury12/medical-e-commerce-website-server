import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { OrderController } from './order.controller'
import { ZOrderCreate } from './order.validation'

const router = Router()

router.post('/', validateRequest(ZOrderCreate), OrderController.insertToDB)

export const orderRoutes = router
