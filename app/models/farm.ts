import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Producer from './producer.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Farming from './farming.js'
import City from './city.js'
import Person from './person.js'

export default class Farm extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare area: number

  @column({ columnName: 'vegetation_area' })
  declare vegetationArea: number

  @belongsTo(() => Person)
  declare person: BelongsTo<typeof Person>

  @manyToMany(() => Producer)
  declare producers: ManyToMany<typeof Producer>

  @hasMany(() => Farming)
  declare farmings: HasMany<typeof Farming>

  @belongsTo(() => City)
  declare city: BelongsTo<typeof City>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}