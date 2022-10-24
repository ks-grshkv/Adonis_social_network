// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import LoginUserValidator from 'App/Validators/LoginUserValidator'

export default class AuthController {
    public async signup({request, response}: HttpContextContract){
        const req = await request.validate(CreateUserValidator)
        const user = new User()
        user.name = req.name
        user.email = req.email
        user.password = req.password
        user.save()

        return response.redirect('/')
    }


    public async login({ request, auth, response }: HttpContextContract){
        const req = await request.validate(LoginUserValidator)
        // const user = await User.findByOrFail('email', req.email)
        const email = req.email
        const password = req.password
        await auth.attempt(email, password)

        return response.redirect('/')
    }


    public async logout({ auth, response }: HttpContextContract){
        await auth.logout()
        return response.redirect('/login')
    }
}
