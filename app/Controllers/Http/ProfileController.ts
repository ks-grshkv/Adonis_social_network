'use strict'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class ProfileController {

    public async index({ view, params }: HttpContextContract){
        const user = await User
            .query()
            .where('id', params.user_id)
            .preload('news',(n) => n.orderBy('id','desc'))
            .first()
       
        if (!user)
            return view.render('errors.not-found')
        return view.render('profile', { user })
    }
}
