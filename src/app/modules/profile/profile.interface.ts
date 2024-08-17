import { Model } from 'mongoose'

export type IProfile = {
  name: string
  address: string
  image: string
  isVerified: boolean
  conatactNo: string
}

export type ProfileModel = Model<IProfile>
