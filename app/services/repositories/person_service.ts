import Person from '#models/person'
import { inject } from '@adonisjs/core'

export interface PersonRepository {
  create(person: Partial<Person>): Promise<Person>
  delete(id: number): Promise<void>
  update(id: number, person: Partial<Person>): Promise<Person>
}

@inject()
export class PersonRepository implements PersonRepository {
  protected personModel: typeof Person

  constructor() {
    this.personModel = Person
  }

  async create(person: Partial<Person>): Promise<Person> {
    const result = await this.personModel.create(person)
    return result
  }

  async delete(id: number): Promise<void> {
    await this.personModel.query().where('id', id).delete()
  }

  async update(id: number, person: Partial<Person>): Promise<Person | null> {
    await this.personModel.query().where('id', id).update(person)
    return await this.personModel.findBy('id', id)
  }
}
