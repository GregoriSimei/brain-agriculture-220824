import { CreateFarmingUseCase } from '#services/usecases/farming/create_farming_service'
import { createFarmingValidator } from '#validators/farming/create_farming'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CreateFarmingsController {
  constructor(protected createFarmingUsecase: CreateFarmingUseCase) {}

  async handle({ request }: HttpContext) {
    const { params, ...body } = await request.validateUsing(createFarmingValidator)
    const result = await this.createFarmingUsecase.handle({
      farmId: params.farm_id,
      ...body,
    })
    return result
  }
}
