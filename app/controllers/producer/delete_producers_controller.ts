import { DeleteProducerUseCase } from '#services/usecases/producer/delete_producer_service'
import { deleteProducerValidator } from '#validators/producer/delete_producer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DeleteProducersController {
  constructor(protected deleteProducerUseCase: DeleteProducerUseCase) {}

  async handle({ request, response }: HttpContext) {
    const { params } = await request.validateUsing(deleteProducerValidator)
    const result = await this.deleteProducerUseCase.handle({ producerId: params.producer_id })

    if (!result) return response.status(500).send('Error to delete producer')

    return result
  }
}
