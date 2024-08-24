import { HttpContext } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'

export default class InternalServerErrorException extends Exception {
  static status = 500
  static code = 'E_BAD_REQUEST'

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send(error.message)
  }
}
