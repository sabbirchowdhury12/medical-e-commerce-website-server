import mongoose, { Schema } from 'mongoose'
import { IProfile, ProfileModel } from './profile.interface'

const ProfileSchema = new mongoose.Schema<IProfile>(
  {
    name: { type: String },
    image: { type: String },
    isVerified: { type: Boolean, default: false },
    conatactNo: { type: String },
    address: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { versionKey: false },
)

export const Profile = mongoose.model<IProfile, ProfileModel>(
  'Profile',
  ProfileSchema,
)
