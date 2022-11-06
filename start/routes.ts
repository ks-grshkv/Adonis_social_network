/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/


import Logger from '@ioc:Adonis/Core/Logger'
import I18n from '@ioc:Adonis/Addons/I18n'
import Route from '@ioc:Adonis/Core/Route'

Route.any('/', 'NewsController.index')

Route.resource('news', 'NewsController')
Route.post('/news/:news_id/comment', 'CommentsController.store')

Route.on('/signup').render('auth/signup')
Route.on('/login').render('auth/login')

Route.post('/signup', 'AuthController.signup')
Route.post('/login', 'AuthController.login')
Route.get('/logout', 'AuthController.logout')

Route.any('language/:locale', async ({ session, response, params }) => {
  Logger.info(params.locale)
    if (I18n.supportedLocales().includes(params.locale)) {      
      session.forget('locale')
      session.put('locale', params.locale)
    }
    response.redirect('back')
  }).as('language.update')

Route.get('/:user_id', 'ProfileController.index')
