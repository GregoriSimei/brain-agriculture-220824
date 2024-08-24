import City from '#models/city'

export interface CityRepository {
  create(city: Partial<City>): Promise<City>
  findByName(name: string): Promise<City | null>
}

export class CityRepository implements CityRepository {
  protected cityModel: typeof City

  constructor() {
    this.cityModel = City
  }

  async create(city: Partial<City>): Promise<City> {
    return await this.cityModel.create(city)
  }

  async findByName(name: string): Promise<City | null> {
    return await this.cityModel.findBy('name', name)
  }
}
