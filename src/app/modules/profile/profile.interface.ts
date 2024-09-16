import { Model, Types } from 'mongoose'

export type IProfile = {
  name: string
  address: string
  image: string
  isVerified: boolean
  conatactNo: string
  userId: Types.ObjectId
}

export type ProfileModel = Model<IProfile>
