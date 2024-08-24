import vine from '@vinejs/vine'

export const createFarmingValidator = vine.compile(
  vine.object({
    params: vine.object({
      farm_id: vine.number(),
    }),
    area: vine.number(),
    name: vine.string(),
  })
)
