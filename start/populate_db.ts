import City from '#models/city'
import Farm from '#models/farm'
import Farming from '#models/farming'
import FarmingType from '#models/farming_type'
import Person from '#models/person'
import Producer from '#models/producer'
import State from '#models/state'

const MINIMUM_LENGTH: number = 50

async function populateDatabase() {
  const farms = await Farm.query()
  if (farms.length > MINIMUM_LENGTH) return

  for (let i = 0; i < MINIMUM_LENGTH; i++) {
    const farmPersonToCreate: Partial<Person> = {
      name: `farm ${i + 1}`,
      type: 'CNPJ',
      document: gerarCNPJ(),
    }
    const farmPersonCreated = await Person.create(farmPersonToCreate)

    const randomState = gerarEstadoAleatorioBrasil()
    const stateFound = await State.findBy('name', randomState)
    const stateToWork = stateFound || (await State.create({ name: randomState }))

    const randomCity = `City ${i}`
    const cityToWork = await City.create({ name: randomCity, stateId: stateToWork.id })

    const farmToCreate: Partial<Farm> = {
      area: gerarNumAleatorio(10000, 15000),
      vegetationArea: gerarNumAleatorio(3000, 5000),
      cityId: cityToWork.id,
      personId: farmPersonCreated.id,
    }
    const createdFarm = await Farm.create(farmToCreate)

    const availableArea = createdFarm.area - createdFarm.vegetationArea
    const numFarmings = gerarNumAleatorio(2, 5)
    const availableFarmingAreas = dividirAreaAleatoriamente(availableArea * 0.8, numFarmings)
    for (const availableFarmingArea of availableFarmingAreas) {
      const farmingTypeName = gerarCultivoAleatorio()
      const farmingTypeFound = await FarmingType.findBy('name', farmingTypeName)
      const farmingTypeToWork =
        farmingTypeFound || (await FarmingType.create({ name: farmingTypeName }))

      const farmingToCreate: Partial<Farming> = {
        area: availableFarmingArea,
        farmId: createdFarm.id,
        farmingTypeId: farmingTypeToWork.id,
      }
      await Farming.create(farmingToCreate)
    }

    const producersToCreate = gerarNumAleatorio(2, 5)
    for (let iProducer = 0; iProducer < producersToCreate; iProducer++) {
      const producerPersonToCreate: Partial<Person> = {
        name: `producer ${iProducer + 1}`,
        type: 'CPF',
        document: gerarCPF(),
      }
      const producerPerson = await Person.create(producerPersonToCreate)

      const producerToCreate: Partial<Producer> = {
        personId: producerPerson.id,
      }
      const producerCreated = await Producer.create(producerToCreate)
      await createdFarm.related('producers').attach([producerCreated.id])
    }
  }

  console.log('FINISH POPULATE')
}

populateDatabase().catch(console.error)

function gerarCNPJ(): string {
  // Gera os 12 primeiros dígitos do CNPJ
  let cnpj = ''
  for (let i = 0; i < 12; i++) {
    cnpj += Math.floor(Math.random() * 10).toString()
  }

  // Função para calcular o dígito verificador
  function calcularDigito(base: string) {
    let peso = base.length - 7
    let soma = 0
    for (const element of base) {
      soma += Number.parseInt(element) * peso--
      if (peso < 2) peso = 9
    }
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  // Calcula o primeiro dígito verificador
  cnpj += calcularDigito(cnpj)

  // Calcula o segundo dígito verificador
  cnpj += calcularDigito(cnpj)

  return cnpj
}

function gerarCPF(): string {
  // Gera os 9 primeiros dígitos do CPF
  let cpf = ''
  for (let i = 0; i < 9; i++) {
    cpf += Math.floor(Math.random() * 10).toString()
  }

  // Função para calcular o dígito verificador
  function calcularDigito(base: string) {
    let soma = 0
    for (let i = 0; i < base.length; i++) {
      soma += Number.parseInt(base[i]) * (base.length + 1 - i)
    }
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }

  // Calcula o primeiro dígito verificador
  cpf += calcularDigito(cpf)

  // Calcula o segundo dígito verificador
  cpf += calcularDigito(cpf)

  return cpf
}

function gerarNumAleatorio(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function gerarEstadoAleatorioBrasil(): string {
  const estadosDoBrasil = [
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Distrito Federal',
    'Espírito Santo',
    'Goiás',
    'Maranhão',
    'Mato Grosso',
    'Mato Grosso do Sul',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'Santa Catarina',
    'São Paulo',
    'Sergipe',
    'Tocantins',
  ]

  const randomIndex = Math.floor(Math.random() * estadosDoBrasil.length)

  return estadosDoBrasil[randomIndex]
}

function dividirAreaAleatoriamente(areaTotal: number, numPartes: number): number[] {
  // Verifica se a divisão é possível
  if (numPartes <= 0) return []

  // Cria pontos de divisão aleatórios
  let pontos = [0]
  for (let i = 1; i < numPartes; i++) {
    pontos.push(Math.random())
  }
  pontos.push(1)

  // Ordena os pontos para garantir que estão em ordem crescente
  pontos.sort((a, b) => a - b)

  // Calcula os tamanhos das áreas divididas
  let partes = []
  for (let i = 1; i < pontos.length; i++) {
    let parte = (pontos[i] - pontos[i - 1]) * areaTotal
    partes.push(Math.floor(parte))
  }

  return partes
}

function gerarCultivoAleatorio(): string {
  const cultivos = ['Soja', 'Cafe', 'Feijao', 'Arroz', 'Milho', 'Trigo', 'Uva', 'Abacaxi']

  const randomIndex = Math.floor(Math.random() * cultivos.length)

  return cultivos[randomIndex]
}
