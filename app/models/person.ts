import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Producer from './producer.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Farm from './farm.js'

export default class Person extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare type: 'CPF' | 'CNPJ'

  @hasOne(() => Producer)
  declare producer: HasOne<typeof Producer>

  @hasOne(() => Farm)
  declare farm: HasOne<typeof Farm>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}