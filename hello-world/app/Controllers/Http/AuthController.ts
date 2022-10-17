// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
    public async signup({request, response}: HttpContextContract){
        const req = await request.validate({schema:schema.create({
            name: schema.string(),
            email: schema.string({},[
                rules.email()
            ]),
            password: schema.string({}, [
                rules.confirmed()
            ])
        }),
        messages: {
            'name.required': 'Name required11',
            'email.required': 'Email required11',
            'password.required': 'Password required11',
        }
    })
        const user = new User()
        user.name = req.name
        user.email = req.email
        user.password = req.password
        user.save()

        return response.redirect('/')
    }


    public async login({ request, auth, response }: HttpContextContract){
        const req = await request.validate({
            schema: schema.create({
                email: schema.string({},[
                    rules.email()
                ]),
                password: schema.string()
            }),
            messages: {
                'email.required': 'Email required11',
                'password.required': 'Password required11',
            }
    })
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
