/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import { validator } from '@ioc:Adonis/Core/Validator'
import Logger from "@ioc:Adonis/Core/Logger"
import HttpContext from '@ioc:Adonis/Core/HttpContext'

validator.rule(
    'password_correct', 
    async (value, email, options) => {
        Logger.info('AAAAAAA')
        Logger.info(value)

        if (typeof value !== 'string') {
            return
        }
        const ctx = HttpContext.get()!
        Logger.info(ctx.params.email)

        const user = await User.findBy('email', email)
        if (!user)
            return 
        const password = user.password
        if (!(Hash.verify(password, value))) {
            options.errorReporter.report(
                options.pointer,
                'password_correct',
                'password_correct validation failed',
                options.arrayExpressionPointer
            )
        }
    }, 
)

