import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { ProfileService } from './profile.service'
import sendResponse from '../../../shared/sendResponse'
import { IProfile } from './profile.interface'

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const data = await ProfileService.updateProfile(req.params.id, req.body)

  sendResponse<IProfile>(res, {
    statusCode: 200,
    success: true,
    message: 'Profile updated successfully!',
    data,
  })
})

const getProfiles = catchAsync(async (req: Request, res: Response) => {
  const data = await ProfileService.getProfiles()

  sendResponse<IProfile[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Profiles retrieved successfully!',
    data,
  })
})

const getProfile = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params.id)
  const data = await ProfileService.getProfile(req.params.id)

  sendResponse<IProfile>(res, {
    statusCode: 200,
    success: true,
    message: 'Profile retrieved successfully!',
    data,
  })
})

const deleteProfile = catchAsync(async (req: Request, res: Response) => {
  const data = await ProfileService.deleteProfile(req.params.id)

  sendResponse<IProfile>(res, {
    statusCode: 200,
    success: true,
    message: 'Profile Deleted successfully!',
    data,
  })
})

export const ProfileController = {
  updateProfile,
  getProfiles,
  getProfile,
  deleteProfile,
}
