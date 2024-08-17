import { startSession } from 'mongoose'
import { hashPassword, matchPassword } from '../../../helper/bcrypt'
import { User } from './auth.model'
import { Profile } from '../profile/profile.model'
import ApiError from '../../../errors/apiError'
import { createToken } from '../../../helper/jwt'
import {
  TLogin,
  TLoginResponse,
  TRegister,
  TRegisterResponse,
} from './auth.interface'

const login = async ({ email, password }: TLogin): Promise<TLoginResponse> => {
  // Find the user by email
  const user = await User.findOne({ email })

  if (!user) throw new ApiError(404, "User doesn't exist!")

  // Compare the provided password with the hashed password in the database
  const isPasswordMatched = await matchPassword(password, user.password)

  if (!isPasswordMatched) throw new ApiError(401, 'Password is incorrect!')

  // Extract the necessary details for token generation
  const { _id: id, role } = user

  // Generate tokens
  const accessToken = createToken({ id, role }, 'access')
  const refreshToken = createToken({ id, role }, 'refresh')

  return { accessToken, refreshToken }
}

const register = async ({
  email,
  password,
  ...others
}: TRegister): Promise<TRegisterResponse> => {
  password = await hashPassword(password)

  // Check if the environment supports transactions
  const isReplicaSet = process.env.REPLICA_SET === 'true' // or another method to detect if using a replica set

  let session
  if (isReplicaSet) {
    session = await startSession()
    session.startTransaction()
  }

  try {
    const user = await User.create(
      [{ email, password }],
      session ? { session } : {},
    )
    const profile = await Profile.create(
      [{ userId: user[0]._id, ...others }],
      session ? { session } : {},
    )

    if (!user[0] || !profile[0])
      throw new ApiError(400, 'Failed to create user!', '')

    // Commit the transaction if session exists
    if (session) {
      await session.commitTransaction()
      session.endSession()
    }

    // Extract user details
    const { _id: id, role } = user[0]

    // Generate tokens
    const accessToken = createToken({ id, role }, 'access')
    const refreshToken = createToken({ id, role }, 'refresh')

    return { user: profile[0], accessToken, refreshToken }
  } catch (error) {
    // Abort the transaction if session exists
    if (session) {
      await session.abortTransaction()
      session.endSession()
    }
    throw error
  }
}

export const AuthService = { register, login }
