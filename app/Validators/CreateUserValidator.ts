import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    name: schema.string({}, [
      rules.maxLength(20),
      rules.trim(),
      ]),
    email: schema.string({}, [
      rules.email(),
      rules.trim(),
      rules.normalizeEmail({
        allLowercase: true,
        gmailRemoveDots: true,
        gmailRemoveSubaddress: true,
      }),
      rules.unique({table: 'users', column: 'email', caseInsensitive: true,}),
      rules.maxLength(20),
  ]), 
    password: schema.string({}, [
      rules.confirmed(),
  ]), 
  })

  public messages: CustomMessages = {
    'name.required': 'Name is required',
    'email.required': 'Email is required',
    'password.required': 'Password is required',
    'password.confirmed': 'Make sure to type the password correctly twice!',
    'email.unique': 'User with this email already exists',
    'email.maxLength': 'Maximum length for email is 20 symbols',
    'name.maxLength': 'Maximum length for name is 20 symbols',
    'email.trim': 'Please make sure your email doesnt contain whitespace',
  }
}
