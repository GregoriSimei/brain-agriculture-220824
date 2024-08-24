import { FarmDashDataUseCase } from '#services/usecases/farmDash/farm_dash_datum_service'
import { inject } from '@adonisjs/core'

@inject()
export default class FarmDashDataController {
  constructor(protected farmDashDataUseCase: FarmDashDataUseCase) {}

  async handle() {
    return await this.farmDashDataUseCase.handle()
  }
}
