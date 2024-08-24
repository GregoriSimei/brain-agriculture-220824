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
    if (!this.validateCNPJ(cnpj)) throw new BadRequestException('Invalid CNPJ')

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

  private validateCNPJ(cnpj: string): boolean {
    if (/^(\d)\1{13}$/.test(cnpj)) return false

    // Função para calcular o dígito verificador
    const calculateDigit = (cnpjCode: string, factor: number[]): number => {
      let sum = 0
      for (const [i, element] of factor.entries()) {
        sum += Number.parseInt(cnpjCode.charAt(i)) * element
      }
      const result = 11 - (sum % 11)
      return result > 9 ? 0 : result
    }

    // Calcula e verifica o primeiro dígito verificador
    const firstDigit = calculateDigit(cnpj, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
    if (Number.parseInt(cnpj.charAt(12)) !== firstDigit) return false

    // Calcula e verifica o segundo dígito verificador
    const secondDigit = calculateDigit(cnpj, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
    return Number.parseInt(cnpj.charAt(13)) === secondDigit
  }
}
