// import type { HttpContext } from '@adonisjs/core/http'

import { CreateUserService } from "#services/users/create_user_service";
import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";

@inject()
export default class CreateUsersController {
    constructor(
        protected createUserService: CreateUserService
    ) {}

    async handle({ request }: HttpContext) {
        const body = request.only(['email', 'username', 'password'])
        const result = await this.createUserService.handle(body)
        return result
    }
}