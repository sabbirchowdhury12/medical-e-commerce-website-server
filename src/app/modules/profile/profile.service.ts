import { IProfile } from './profile.interface'
import { Profile } from './profile.model'

const updateProfile = async (
  id: string,
  payload: Partial<IProfile>,
): Promise<IProfile | null> => {
  const profile = await Profile.findByIdAndUpdate(id, payload, {
    new: true,
  }).exec()
  return profile
}

const getProfiles = async (): Promise<IProfile[]> => {
  const result = await Profile.find().exec()
  return result
}

const getProfile = async (userId: string): Promise<IProfile | null> => {
  const result = await Profile.findOne({ userId }).populate('user').exec()
  return result
}

const deleteProfile = async (id: string): Promise<IProfile | null> => {
  const result = await Profile.findByIdAndDelete(id).exec()
  return result
}

export const ProfileService = {
  updateProfile,
  getProfiles,
  getProfile,
  deleteProfile,
}
