import { Model } from 'mongoose'

export type IRole = 'customer' | 'admin' | 'super-admin'

export type IUser = {
  email: string
  password: string
  role: IRole
}

export type UserModel = Model<IUser>

export type TRegisterResponse = {
  accessToken: string
  refreshToken: string
  user: {
    name: string
    image: string
  }
}
export type TRegister = {
  email: string
  password: string
  name: string
  image: string
}
export type TLoginResponse = {
  accessToken: string
  refreshToken: string
}
export type TLogin = {
  email: string
  password: string
}
