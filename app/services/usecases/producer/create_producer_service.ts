import BadRequestException from '#exceptions/bad_request_exception'
import Person from '#models/person'
import Producer from '#models/producer'
import { PersonRepository } from '#services/repositories/person_service'
import { ProducerRepository } from '#services/repositories/producer_service'
import { inject } from '@adonisjs/core'

export type CreateProducerUseCaseRequest = {
  cpf: string
  name: string
}

export type CreateProducerUseCaseResponse = Producer

export interface CreateProducerUseCase {
  handle(request: CreateProducerUseCaseRequest): Promise<CreateProducerUseCaseResponse>
}

@inject()
export class CreateProducerUseCase implements CreateProducerUseCase {
  constructor(
    protected producerRepository: ProducerRepository,
    protected personrepository: PersonRepository
  ) {}

  async handle({
    cpf,
    name,
  }: CreateProducerUseCaseRequest): Promise<CreateProducerUseCaseResponse> {
    if (!this.validateCPF(cpf)) throw new BadRequestException('Invalid CPF')

    const producerFound = await this.producerRepository.findByCPF(cpf)
    if (producerFound) throw new BadRequestException('Producer alredy exists')

    const personToCreate: Partial<Person> = {
      name,
      type: 'CPF',
      document: cpf,
    }
    const createdPerson = await this.personrepository.create(personToCreate)

    const producerToCreate: Partial<Producer> = {
      personId: createdPerson.id,
    }
    const producerCreated = await this.producerRepository.create(producerToCreate)

    return producerCreated
  }

  private validateCPF(cpf: string): boolean {
    // Verifica se o CPF é uma sequência de números iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false

    // Função para calcular o dígito verificador
    const calculateDigit = (cpfToVerifyDigit: string, factor: number): number => {
      let sum = 0
      for (let i = 0; i < factor - 1; i++) {
        sum += Number.parseInt(cpfToVerifyDigit.charAt(i)) * (factor - i)
      }
      const result = (sum * 10) % 11
      return result === 10 || result === 11 ? 0 : result
    }

    // Calcula e verifica o primeiro dígito verificador
    const firstDigit = calculateDigit(cpf, 10)
    if (Number.parseInt(cpf.charAt(9)) !== firstDigit) return false

    // Calcula e verifica o segundo dígito verificador
    const secondDigit = calculateDigit(cpf, 11)
    return Number.parseInt(cpf.charAt(10)) === secondDigit
  }
}
