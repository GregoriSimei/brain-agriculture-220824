import BadRequestException from '#exceptions/bad_request_exception'
import { FarmRepository } from '#services/repositories/farm_service'
import { ProducerRepository } from '#services/repositories/producer_service'
import { inject } from '@adonisjs/core'

export type AddProducerToFarmUseCaseRequest = {
  farmId: number
  cpf: string
}

export type AddProducerToFarmUseCaseResponse = void

export interface AddProducerToFarmUseCase {
  handle(request: AddProducerToFarmUseCaseRequest): Promise<AddProducerToFarmUseCaseResponse>
}

@inject()
export class AddProducerToFarmUseCase implements AddProducerToFarmUseCase {
  constructor(
    protected producerRepository: ProducerRepository,
    protected farmRepository: FarmRepository
  ) {}

  async handle({
    cpf,
    farmId,
  }: AddProducerToFarmUseCaseRequest): Promise<AddProducerToFarmUseCaseResponse> {
    const producerFound = await this.producerRepository.findByCPF(cpf)
    if (!producerFound) throw new BadRequestException('Invalid cpf')

    const farmFound = await this.farmRepository.findById(farmId)
    if (!farmFound) throw new BadRequestException('Farm not found')

    await this.farmRepository.addProducerToFarm(farmFound, producerFound)
  }
}
