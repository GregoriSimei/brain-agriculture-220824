import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import { CreateFarmUseCase } from '#services/usecases/farm/create_farm_service'
import { createFarmValidator } from '#validators/farm/create_farm'

@inject()
export default class CreateFarmsController {
  constructor(protected createFarmUseCase: CreateFarmUseCase) {}

  async handle({ request }: HttpContext) {
    const payload = await request.validateUsing(createFarmValidator)
    const result = this.createFarmUseCase.handle(payload)
    return result
  }
}
