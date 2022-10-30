'use strict'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import News from 'App/Models/News'
import User from 'App/Models/User'

export default class ProfileController {

    public async index({ view, params }: HttpContextContract){
        const user = await User.findBy('id', params.user_id)
        if (!user)
            return view.render('errors.not-found')

        // const news  = await user.related('news').query().orderBy('id', 'desc')
        //const news = await News.query().where('id',)
        // const news = user.related('news')
        return view.render('profile', {
            news: await News.all(),
            author: user.name
          })
    }
}
