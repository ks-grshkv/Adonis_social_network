import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    body: schema.string({},[
      rules.maxLength(150)
    ]),
  })

  public messages: CustomMessages = {
    'body.required': 'Comment body is required',
    'body.maxLength': 'Maximum length for comments is 150 symbols',
  }
}
