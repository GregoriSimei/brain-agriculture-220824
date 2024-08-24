import Farm from '#models/farm'
import Producer from '#models/producer'
import { inject } from '@adonisjs/core'

export interface FarmRepository {
  create(farm: Partial<Farm>): Promise<Farm>
  findByCNPJ(cnpj: string): Promise<Farm | null>
  findById(id: number, populate?: boolean): Promise<Farm | null>
  addProducerToFarm(farm: Farm, producer: Producer): Promise<void>
}

@inject()
export class FarmRepository implements FarmRepository {
  protected farmModel: typeof Farm

  constructor() {
    this.farmModel = Farm
  }

  async create(farm: Partial<Farm>): Promise<Farm> {
    const result = await this.farmModel.create(farm)
    return result
  }

  async findByCNPJ(cnpj: string): Promise<Farm | null> {
    const result = await this.farmModel
      .query()
      .whereHas('person', (query) => {
        query.where('type', 'CNPJ').where('document', cnpj)
      })
      .first()
    return result
  }

  async findById(id: number, populate = false): Promise<Farm | null> {
    if (populate)
      return await this.farmModel
        .query()
        .preload('city')
        .preload('farmings')
        .preload('person')
        .preload('producers')
        .where('id', id)
        .first()
    return await this.farmModel.findBy('id', id)
  }

  async addProducerToFarm(farm: Farm, producer: Producer): Promise<void> {
    const farmFound = await this.farmModel.findBy('id', farm.id)
    await farmFound?.related('producers').attach([producer.id])
  }
}
