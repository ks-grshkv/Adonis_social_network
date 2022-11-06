import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginUserValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({

    email: schema.string({}, [
      rules.email(),
      rules.normalizeEmail({
        allLowercase: true,
        gmailRemoveDots: true,
        gmailRemoveSubaddress: true,
      }),
      rules.exists({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [
      rules.password_correct(this.ctx.params.email)
    ]),
  })


  public messages: CustomMessages = {
    'password.required': 'Password is required',
    'email.required': 'Email is required',
    'email.exists': 'A user with this email does not exist {{this.ctx.params.email}}',
    'password_correct': 'Incorrect password',
  }
}
 