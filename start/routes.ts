/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const CreateFarmsController = () => import('#controllers/farm/create_farms_controller')
const CreateUsersController = () => import('#controllers/users/create_users_controller')
const CreateProducersController = () => import('#controllers/producer/create_producers_controller')
const DeleteProducersController = () => import('#controllers/producer/delete_producers_controller')
const UpdateProducersController = () => import('#controllers/producer/update_producers_controller')
const AddProducerToFarmsController = () =>
  import('#controllers/farm/add_producer_to_farms_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Users
router.post('/users', [CreateUsersController, 'handle'])

// Farms
router.post('/farms', [CreateFarmsController, 'handle'])
router.put('/farms/:farm_id/producers', [AddProducerToFarmsController, 'handle'])

// Producers
router.post('/producers', [CreateProducersController, 'handle'])
router.delete('/producers/:producer_id', [DeleteProducersController, 'handle'])
router.patch('/producers/:producer_id', [UpdateProducersController, 'handle'])
