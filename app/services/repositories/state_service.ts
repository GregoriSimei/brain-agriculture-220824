import State from '#models/state'

export interface StateRepository {
  create(state: Partial<State>): Promise<State>
  findByName(name: string): Promise<State | null>
}

export class StateRepository implements StateRepository {
  protected stateModel: typeof State

  constructor() {
    this.stateModel = State
  }

  async create(state: Partial<State>): Promise<State> {
    return await this.stateModel.create(state)
  }

  async findByName(name: string): Promise<State | null> {
    return await this.stateModel.findBy('name', name)
  }
}
