'use strict'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import News from 'App/Models/News'
import CreatePostValidator from 'App/Validators/CreatePostValidator'



export default class NewsController {
    public async index({ view }: HttpContextContract){
        const news = await News
        .query()
        .orderBy('id', 'desc')
        .preload('user')
               
        return view.render('index', { news })
    }

    public async create({view}: HttpContextContract){
        return view.render('create_news', {})
    }

    public async store({ request, response, auth }: HttpContextContract){
        const payload = await request.validate(CreatePostValidator)
        if (!auth.user) {
            return response.redirect('/login')
        }
        const new_post = new News()
        new_post.merge(payload)
        new_post.user_id = auth.user.id
        new_post.save()
        return response.redirect('/news')
            
    }

    public async show({ view, params }: HttpContextContract){
        const news = await News
            .query()
            .where('id', params.id)
            .preload('user')
            .preload('comments', (c) => { c.preload('user') })
            .first()

        if (!news){
            return view.render('errors.not-found')
        }
        return view.render('show_news', { news })
    }
}
