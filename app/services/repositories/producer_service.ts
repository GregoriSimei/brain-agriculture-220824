import Producer from '#models/producer'
import { inject } from '@adonisjs/core'

export interface ProducerRepository {
  create(producer: Partial<Producer>): Promise<Producer>
  findByCPF(cpf: string): Promise<Producer | null>
  findProducerByIdAndPopulate(id: number): Promise<Producer | null>
  delete(id: number): Promise<void>
}

@inject()
export class ProducerRepository implements ProducerRepository {
  protected producerModel: typeof Producer

  constructor() {
    this.producerModel = Producer
  }

  async create(producer: Partial<Producer>): Promise<Producer> {
    return await this.producerModel.create(producer)
  }

  async findByCPF(cpf: string): Promise<Producer | null> {
    return this.producerModel
      .query()
      .whereHas('person', (query) => {
        query.where('type', 'CPF').where('document', cpf)
      })
      .first()
  }

  async findProducerByIdAndPopulate(id: number): Promise<Producer | null> {
    return await this.producerModel.query().preload('person').where('id', id).first()
  }

  async delete(id: number) {
    await this.producerModel.query().where('id', id).delete()
  }
}
