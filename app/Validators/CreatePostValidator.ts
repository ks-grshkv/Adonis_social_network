import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({}, [
      rules.maxLength(20)
    ]),
    body: schema.string({}, [
      rules.maxLength(150)
    ]),
  })

  public messages: CustomMessages = {
    'title.required': 'Title is required',
    'body.required': 'Body is required',
    'title.maxLength': 'Maximum length for comments is 20 symbols',
    'body.maxLength': 'Maximum length for comments is 150 symbols',
  }
}
