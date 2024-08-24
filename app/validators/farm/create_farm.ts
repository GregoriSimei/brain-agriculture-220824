import vine from '@vinejs/vine'

export const createFarmValidator = vine.compile(
  vine.object({
    cnpj: vine.string().trim().minLength(14).maxLength(14),
    name: vine.string(),
    area: vine.number(),
    vegetationArea: vine.number(),
    city: vine.string(),
    state: vine.string(),
  })
)
