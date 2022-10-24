'use strict'

import { LocalFileServer } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import News from 'App/Models/News'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
import I18n from '@ioc:Adonis/Addons/I18n'

export default class NewsController {
    public async index({ view }: HttpContextContract){
        const news = await News.all()        
        return view.render('index', {
            news: news,
          })
    }

    public async create({ request, response, auth }: HttpContextContract){
        const req = await request.validate(CreatePostValidator)
        const new_post = new News()
        new_post.title = req.title
        new_post.body = req.body
        
        if (auth.isAuthenticated){
            new_post.author = auth.user.name
            new_post.author_id = auth.user.id
        }
        else
            new_post.author = 'unknown kapibara'
        new_post.save()

        return response.redirect('/')
    }
}
