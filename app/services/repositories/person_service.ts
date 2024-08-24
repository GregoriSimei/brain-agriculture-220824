import Person from '#models/person'
import { inject } from '@adonisjs/core'

export interface PersonRepository {
  create(person: Partial<Person>): Promise<Person>
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
}
