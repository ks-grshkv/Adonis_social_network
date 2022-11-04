import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */

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

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'name.required': 'Name required!11',
    'email.required': 'Email required!11',
    'password.required': 'Password required!11',
    'password.confirmed': 'Make sure to type the password correctly twice!!',
    'email.unique': 'User with this email already exists!!!11',
    'email.maxLength': 'Maximum length for email is 20 symbols',
    'name.maxLength': 'Maximum length for name is 20 symbols',
    'email.trim': 'Please make sure your email doesnt contain whitespace',
  }
}
