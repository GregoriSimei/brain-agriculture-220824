import vine from '@vinejs/vine'

export const updateProducerValidator = vine.compile(
  vine.object({
    name: vine.string(),
    params: vine.object({
      producer_id: vine.number(),
    }),
  })
)
