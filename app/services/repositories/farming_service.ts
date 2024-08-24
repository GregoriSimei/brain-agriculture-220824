import Farming from '#models/farming'

export interface FarmingRepository {
  create(farming: Partial<Farming>): Promise<Farming>
}

export class FarmingRepository implements FarmingRepository {
  protected farmingModel: typeof Farming

  constructor() {
    this.farmingModel = Farming
  }

  async create(farming: Partial<Farming>): Promise<Farming> {
    return await this.farmingModel.create(farming)
  }
}
