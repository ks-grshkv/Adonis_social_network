import Hash from '@ioc:Adonis/Core/Hash'
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

    public async login({ request, auth, response, session }: HttpContextContract){
        const payload = await request.validate(LoginUserValidator)
        const user = await User
        .query()
        .where('email', payload.email)
        .firstOrFail()

        if (!(await Hash.verify(user.password, payload.password))) {
            session.flash('notification', 'Incorrect password')
            response.redirect().back()
        }
        await auth.attempt(payload.email, payload.password)
        return response.redirect('/news')
    }

    public async logout({ auth, response }: HttpContextContract){
        await auth.logout()
        return response.redirect('/login')
    }
}
