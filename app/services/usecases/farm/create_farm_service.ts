import BadRequestException from '#exceptions/bad_request_exception'
import Farm from '#models/farm'
import Person from '#models/person'
import { FarmRepository } from '#services/repositories/farm_service'
import { PersonRepository } from '#services/repositories/person_service'
import { inject } from '@adonisjs/core'

export type CreateFarmUseCaseRequest = {
  cnpj: string
  name: string
  area: number
  vegetationArea: number
}

export type CreateFarmUseCaseResponse = Farm

export interface CreateFarmUseCase {
  handle(request: CreateFarmUseCaseRequest): Promise<CreateFarmUseCaseResponse>
}

@inject()
export class CreateFarmUseCase implements CreateFarmUseCase {
  constructor(
    protected farmRepository: FarmRepository,
    protected personRepository: PersonRepository
  ) {}

  async handle({
    area,
    cnpj,
    name,
    vegetationArea,
  }: CreateFarmUseCaseRequest): Promise<CreateFarmUseCaseResponse> {
    if (/^(\d)\1{13}$/.test(cnpj)) throw new BadRequestException('Invalid CNPJ')

    const foundFarm = await this.farmRepository.findByCNPJ(cnpj)

    if (foundFarm) throw new BadRequestException('Farm already exist')

    const personToCreate: Partial<Person> = {
      name,
      type: 'CNPJ',
      document: cnpj,
    }
    const personCreated = await this.personRepository.create(personToCreate)

    const farmToCreate: Partial<Farm> = {
      area,
      vegetationArea,
      personId: personCreated.id,
    }
    const farmCreated = await this.farmRepository.create(farmToCreate)

    return farmCreated
  }
}
