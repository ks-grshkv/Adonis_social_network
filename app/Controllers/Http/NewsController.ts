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
               
        return view.render('index', {
            news: news,
          })
    }

    public async create({view}: HttpContextContract){
        return view.render('create_news', {})
    }

    public async store({ request, response, auth }: HttpContextContract){
        const payload = await request.validate(CreatePostValidator)
        if (auth.user) {
            const new_post = await News.create({
                title: payload.title,
                body: payload.body,
                user_id: auth.user.id,
            })
            new_post.save()
            return response.redirect('/news')
        }
        else
            return response.redirect('/login')
    }

    public async show({view, params}: HttpContextContract){
        const news = await News.findByOrFail('id', params.id)
        const news_author = await news.related('user').query().firstOrFail()
        if (!news)
            return view.render('errors.not-found')

        const comments = await news.related('comments')
            .query()
            .orderBy('id', 'desc')


        return view.render('show_news', {
            news: news,
            author: news_author,
            comments: comments
        })
    }
}