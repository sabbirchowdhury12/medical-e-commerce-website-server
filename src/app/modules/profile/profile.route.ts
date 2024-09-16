import { Router } from 'express'
import { ProfileController } from './profile.controller'

const router = Router()

router
  // .post('/create-profile', ProfileController.updateProfile)
  .patch('/', ProfileController.updateProfile)
  .get('/:id', ProfileController.getProfile)
  .get('/', ProfileController.getProfiles)
  .delete('/', ProfileController.deleteProfile)

export const profileRoutes = router
