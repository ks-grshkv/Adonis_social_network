'use strict'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class ProfileController {

    public async index({ view, params }: HttpContextContract){
        const user = await User.findBy('id', params.user_id)
        if (!user)
            return view.render('errors.not-found')

        const news  = await user.related('news').query().orderBy('id', 'desc') //KAL: можно было preload

        return view.render('profile', {
            news: news, // KAL: на всякий случай: это можно написать короче, просто "news," вместо "news: news,"
            author: user.name
          })
    }
}
