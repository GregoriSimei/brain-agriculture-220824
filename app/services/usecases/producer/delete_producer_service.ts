import BadRequestException from '#exceptions/bad_request_exception'
import { PersonRepository } from '#services/repositories/person_service'
import { ProducerRepository } from '#services/repositories/producer_service'
import { inject } from '@adonisjs/core'

export type DeleteProducerUseCaseRequest = {
  producerId: number
}

export type DeleteProducerUseCaseResponse = boolean

export interface DeleteProducerUseCase {
  handle(request: DeleteProducerUseCaseRequest): Promise<DeleteProducerUseCaseResponse>
}

@inject()
export class DeleteProducerUseCase implements DeleteProducerUseCase {
  constructor(
    protected producerRepository: ProducerRepository,
    protected personRepository: PersonRepository
  ) {}

  async handle({
    producerId,
  }: DeleteProducerUseCaseRequest): Promise<DeleteProducerUseCaseResponse> {
    const producerFound = await this.producerRepository.findProducerByIdAndPopulate(producerId)
    if (!producerFound) throw new BadRequestException('Invalid id')

    await this.personRepository.delete(producerFound.personId)
    await this.producerRepository.delete(producerId)

    return true
  }
}
