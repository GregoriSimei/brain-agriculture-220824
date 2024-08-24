import { CreateProducerUseCase } from '#services/usecases/producer/create_producer_service'
import { createProducerValidator } from '#validators/producer/create_producer'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CreateProducersController {
  constructor(protected createProducerUseCase: CreateProducerUseCase) {}

  async handle({ request }: HttpContext) {
    const payload = await request.validateUsing(createProducerValidator)
    return await this.createProducerUseCase.handle(payload)
  }
}
