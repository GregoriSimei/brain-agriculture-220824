import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Farm from './farm.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Person from './person.js'

export default class Producer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @manyToMany(() => Farm)
  declare farms: ManyToMany<typeof Farm>

  @column({ columnName: 'person_id' })
  declare personId: number

  @belongsTo(() => Person)
  declare person: BelongsTo<typeof Person>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
