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
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/users', [CreateUsersController, 'handle'])
router.post('/farms', [CreateFarmsController, 'handle'])
