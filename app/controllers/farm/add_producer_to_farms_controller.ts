import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { addProducerToFarmValidator } from '#validators/farm/add_producer_to_farm'
import { AddProducerToFarmUseCase } from '#services/usecases/farm/add_producer_to_farm_service'

@inject()
export default class AddProducerToFarmsController {
  constructor(protected addProducerToFarmUseCase: AddProducerToFarmUseCase) {}

  async handle({ request, response }: HttpContext) {
    const { params, ...body } = await request.validateUsing(addProducerToFarmValidator)
    await this.addProducerToFarmUseCase.handle({
      ...body,
      farmId: params.farm_id,
    })
    response.status(204)
  }
}
