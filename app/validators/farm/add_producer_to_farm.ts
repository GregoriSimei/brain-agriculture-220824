import vine from '@vinejs/vine'

export const addProducerToFarmValidator = vine.compile(
  vine.object({
    params: vine.object({
      farm_id: vine.number(),
    }),
    cpf: vine.string().minLength(11).maxLength(11),
  })
)
