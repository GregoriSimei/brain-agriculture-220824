import User from '#models/user'
import { inject } from '@adonisjs/core'

export type TCreateUserServiceRequest = {
  email: string
  username: string
  password: string
}

export type TCreateUserServiceResponse = User

@inject()
export class CreateUserService {
  async handle({
    email,
    password,
    username,
  }: TCreateUserServiceRequest): Promise<TCreateUserServiceResponse> {
    const result = await User.create({
      fullName: username,
      email,
      password,
    })

    return result
  }
}
