import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import LoginUserValidator from 'App/Validators/LoginUserValidator'

export default class AuthController {
    public async signup({request, response}: HttpContextContract){
        const payload = await request.validate(CreateUserValidator)
        const user = new User()
        user.name = payload.name
        user.email = payload.email
        user.password = payload.password
        user.save()

        return response.redirect('/news')
    }


    public async login({ request, auth, response }: HttpContextContract){
        const payload = await request.validate(LoginUserValidator)
        const email = payload.email
        const password = payload.password
        await auth.attempt(email, password)

        return response.redirect('/news')
    }


    public async logout({ auth, response }: HttpContextContract){
        await auth.logout()
        return response.redirect('/login')
    }
}
