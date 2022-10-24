'use strict'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import News from 'App/Models/News'
import User from 'App/Models/User'

export default class ProfileController {

    public async index({ view, params }: HttpContextContract){
        const user = await User.findBy('id', params.author_id)
        if (!user)
            return view.render('errors.not-found')

        const news = await News  
            .query()
            .where('author_id', '=', params.author_id)
            .orderBy('id', 'desc')
            .limit(20)

        return view.render('profile', {
            news: news,
            author: user.name
          })
    }
}
