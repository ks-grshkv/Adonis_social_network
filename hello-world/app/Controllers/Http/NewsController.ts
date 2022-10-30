'use strict'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import News from 'App/Models/News'
import Comment from 'App/Models/Comment'
import CreatePostValidator from 'App/Validators/CreatePostValidator'



export default class NewsController {
    public async index({ view }: HttpContextContract){
        const news = await News.all()        
        return view.render('index', {
            news: news,
          })
    }

    public async create({view}: HttpContextContract){
        return view.render('create_news', {})
    }

    public async store({ request, response, auth }: HttpContextContract){
        const payload = await request.validate(CreatePostValidator)
        const new_post = new News()
        new_post.title = payload.title
        new_post.body = payload.body
        
        if (auth.isAuthenticated && auth.user){
            new_post.userId = auth.user.id
        }
        new_post.save()

        return response.redirect('/news')
    }

    public async show({view, params}: HttpContextContract){
        const news = await News.findByOrFail('id', params.id)
        if (!news)
            return view.render('errors.not-found')

        const comments = await news.related('comments').query().orderBy('id', 'desc')
        return Comment.all()
        return view.render('show_news', {
            news: news,
            comments: comments
        })
    }
}
