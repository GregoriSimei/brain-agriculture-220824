import { UpdateProducerUseCase } from '#services/usecases/producer/update_producer_service'
import { updateProducerValidator } from '#validators/producer/update_producer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UpdateProducersController {
  constructor(protected updateProducerUseCase: UpdateProducerUseCase) {}

  async handle({ request }: HttpContext) {
    const { params, ...body } = await request.validateUsing(updateProducerValidator)

    const result = await this.updateProducerUseCase.handle({
      producerId: params.producer_id,
      ...body,
    })

    return result
  }
}
