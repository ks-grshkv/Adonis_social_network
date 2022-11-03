import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import LoginUserValidator from 'App/Validators/LoginUserValidator'

export default class AuthController {
    public async signup({request, response}: HttpContextContract){
        const payload = await request.validate(CreateUserValidator)
        const user = new User()
        user.name = payload.name //KAL: используй merge
        user.email = payload.email
        user.password = payload.password
        user.save() //KAL: хорошо бы await

        return response.redirect('/news')
    }


    public async login({ request, auth, response }: HttpContextContract){
        const payload = await request.validate(LoginUserValidator)
        const email = payload.email //KAL: бесполезные переменные
        const password = payload.password
        await auth.attempt(email, password) // KAL: Так а че, а если attempt не выйдет?
        //KAL: а если юзер при регистрации ввел почту в одном регистре, а логинится в другом?

        return response.redirect('/news')
    }


    public async logout({ auth, response }: HttpContextContract){
        await auth.logout()
        return response.redirect('/login')
    }
}
