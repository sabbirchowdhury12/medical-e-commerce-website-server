import { Router } from 'express'
import { ProfileController } from './profile.controller'

const router = Router()

router
  .post('/create-profile', ProfileController.createProfile)
  .get('/', ProfileController.createProfile)
  .get('/:id', ProfileController.createProfile)
  .patch('/', ProfileController.createProfile)
  .delete('/', ProfileController.createProfile)

export const profileRoutes = router
