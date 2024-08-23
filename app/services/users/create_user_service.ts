export type TCreateUserServiceRequest = {
    email: string,
    username: string,
    password: string
}

export type TCreateUserServiceResponse = string

export class CreateUserService {
    async handle({ email, password, username }: TCreateUserServiceRequest): Promise<TCreateUserServiceResponse> {
        console.log('AQUI: ', email, password, username)
        return 'Deu Certo'
    }
}