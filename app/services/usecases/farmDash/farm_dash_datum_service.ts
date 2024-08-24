import { FarmRepository } from '#services/repositories/farm_service'
import { inject } from '@adonisjs/core'

export type FarmDashDataUseCaseRequest = void

type DataPerType = { [k in string]: number }

export type FarmDashDataUseCaseResponse = {
  qttFarms: number
  areaTotal: number
  state: DataPerType
  farming: DataPerType
  soil: DataPerType
}

export interface FarmDashDataUseCase {
  handle(request: FarmDashDataUseCaseRequest): Promise<FarmDashDataUseCaseResponse>
}

@inject()
export class FarmDashDataUseCase implements FarmDashDataUseCase {
  constructor(protected farmrepository: FarmRepository) {}

  async handle(_: FarmDashDataUseCaseRequest): Promise<FarmDashDataUseCaseResponse> {
    const allFarmData = await this.farmrepository.findAll(true)

    let areaTotal = 0
    let qttFarms = 0
    const farmingData: DataPerType = {}
    const soilData: DataPerType = {
      farmingArea: 0,
      vegetationArea: 0,
    }
    const stateData: DataPerType = {}

    allFarmData.forEach((farm) => {
      qttFarms += 1
      areaTotal += farm.area

      // Calcularte by vegetation soil area
      soilData.vegetationArea += farm.vegetationArea

      // Calculate by state
      const state = farm.city.state.name
      if (!stateData[state]) {
        stateData[state] = 0
      }
      stateData[state] += farm.area

      // Calculate by farming
      farm.farmings.forEach((farming) => {
        const farmingName = farming.farmingType.name
        const farmingArea = farming.area

        // Calculate by farming soil area
        soilData.farmingArea += farmingArea

        if (!farmingData[farmingName]) {
          farmingData[farmingName] = 0
        }

        farmingData[farmingName] += farmingArea
      })
    })

    return {
      areaTotal,
      qttFarms,
      farming: farmingData,
      soil: soilData,
      state: stateData,
    }
  }
}
