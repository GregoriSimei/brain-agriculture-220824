import vine from '@vinejs/vine'

export const createProducerValidator = vine.compile(
  vine.object({
    name: vine.string(),
    cpf: vine.string().trim().minLength(11).maxLength(11),
  })
)
