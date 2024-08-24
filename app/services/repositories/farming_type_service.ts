import FarmingType from '#models/farming_type'

export interface FarmingTypeRepository {
  create(farmingType: Partial<FarmingType>): Promise<FarmingType>
  findByName(name: string): Promise<FarmingType | null>
}

export class FarmingTypeRepository implements FarmingTypeRepository {
  protected farmingTypeModel: typeof FarmingType

  constructor() {
    this.farmingTypeModel = FarmingType
  }

  async create(farmingType: Partial<FarmingType>): Promise<FarmingType> {
    return await this.farmingTypeModel.create(farmingType)
  }

  async findByName(name: string): Promise<FarmingType | null> {
    return this.farmingTypeModel.findBy('name', name)
  }
}
