import Farm from '#models/farm'
import { inject } from '@adonisjs/core'

export interface FarmRepository {
  create(farm: Partial<Farm>): Promise<Farm>
  findByCNPJ(cnpj: string): Promise<Farm | null>
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
}
