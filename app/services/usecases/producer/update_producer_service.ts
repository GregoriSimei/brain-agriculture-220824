import BadRequestException from '#exceptions/bad_request_exception'
import InternalServerErrorException from '#exceptions/internal_server_error_exception'
import Producer from '#models/producer'
import { PersonRepository } from '#services/repositories/person_service'
import { ProducerRepository } from '#services/repositories/producer_service'
import { inject } from '@adonisjs/core'

export type UpdateProducerUseCaseRequest = {
  name: string
  producerId: number
}

export type UpdateProducerUseCaseResponse = Partial<Producer> & { name: string; cpf: string }

export interface UpdateProducerUseCase {
  handle(request: UpdateProducerUseCaseRequest): Promise<UpdateProducerUseCaseResponse>
}

@inject()
export class UpdateProducerUseCase implements UpdateProducerUseCase {
  constructor(
    protected producerRepository: ProducerRepository,
    protected personRepository: PersonRepository
  ) {}

  async handle({
    name,
    producerId,
  }: UpdateProducerUseCaseRequest): Promise<UpdateProducerUseCaseResponse> {
    const producerFound = await this.producerRepository.findProducerByIdAndPopulate(producerId)
    if (!producerFound) throw new BadRequestException('Invalid id')

    const { personId } = producerFound
    const personUpdated = await this.personRepository.update(personId, { name })
    if (!personUpdated) throw new InternalServerErrorException('Unmapped error')

    return {
      id: producerFound.id,
      cpf: personUpdated.document,
      name: personUpdated.name,
    }
  }
}
