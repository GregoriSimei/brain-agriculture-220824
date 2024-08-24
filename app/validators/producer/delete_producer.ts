import vine from '@vinejs/vine'

export const deleteProducerValidator = vine.compile(
  vine.object({
    params: vine.object({
      producer_id: vine.number(),
    }),
  })
)
