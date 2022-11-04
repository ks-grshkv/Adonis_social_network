import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import LoginUserValidator from 'App/Validators/LoginUserValidator'

export default class AuthController {
    public async signup({request, response}: HttpContextContract){
        const payload = await request.validate(CreateUserValidator)
        const user = new User()
        user.merge(payload)
        await user.save()

        return response.redirect('/news')
    }

    public async login({ request, auth, response }: HttpContextContract){
        const payload = await request.validate(LoginUserValidator)
        await auth.attempt(payload.email, payload.password)
        if (!auth){
            return response.redirect('/login')
        }
        return response.redirect('/news')
    }

    public async logout({ auth, response }: HttpContextContract){
        await auth.logout()
        return response.redirect('/login')
    }
}
