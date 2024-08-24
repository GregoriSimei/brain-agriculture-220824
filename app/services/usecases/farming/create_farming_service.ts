import BadRequestException from '#exceptions/bad_request_exception'
import InternalServerErrorException from '#exceptions/internal_server_error_exception'
import Farm from '#models/farm'
import Farming from '#models/farming'
import { FarmRepository } from '#services/repositories/farm_service'
import { FarmingRepository } from '#services/repositories/farming_service'
import { FarmingTypeRepository } from '#services/repositories/farming_type_service'
import { inject } from '@adonisjs/core'

export type CreateFarmingUseCaseRequest = {
  farmId: number
  name: string
  area: number
}

export type CreateFarmingUseCaseResponse = Farm

export interface CreateFarmingUseCase {
  handle(request: CreateFarmingUseCaseRequest): Promise<CreateFarmingUseCaseResponse>
}

@inject()
export class CreateFarmingUseCase implements CreateFarmingUseCase {
  constructor(
    protected farmRepository: FarmRepository,
    protected farmingRepository: FarmingRepository,
    protected farmingTypeRepository: FarmingTypeRepository
  ) {}

  async handle({
    area,
    farmId,
    name,
  }: CreateFarmingUseCaseRequest): Promise<CreateFarmingUseCaseResponse> {
    const farmFound = await this.farmRepository.findById(farmId)
    if (!farmFound) throw new BadRequestException('farm not found')

    const { vegetationArea, area: farmArea } = farmFound
    if (vegetationArea + area > farmArea) throw new BadRequestException('Invalid area')

    const farmingTypeFound = await this.farmingTypeRepository.findByName(name)
    const farmingTypeToWork =
      farmingTypeFound || (await this.farmingTypeRepository.create({ name }))

    const farmingToCreate: Partial<Farming> = {
      farmingTypeId: farmingTypeToWork.id,
      farmId: farmFound.id,
      area,
    }
    await this.farmingRepository.create(farmingToCreate)

    const farmPopulated = await this.farmRepository.findById(farmId, true)
    if (!farmPopulated) throw new InternalServerErrorException('Unknown error')

    return farmPopulated
  }
}
