import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Farm from './farm.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import FarmingType from './farming_type.js'

export default class Farming extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare area: number

  @column({ columnName: 'farming_type_id' })
  declare farmingTypeId: number

  @belongsTo(() => FarmingType)
  declare farmingType: BelongsTo<typeof FarmingType>

  @column({ columnName: 'farm_id' })
  declare farmId: number

  @belongsTo(() => Farm)
  declare farm: BelongsTo<typeof Farm>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
