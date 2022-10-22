'use strict'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import News from 'App/Models/News'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class NewsController {
    public async index({ request, auth, response, view }: HttpContextContract){
        const news = await News.all()
        
        return view.render('index', {
            news: news,
          })
    }

    public async make_news({ request, response, auth }: HttpContextContract){
        const req = await request.validate({schema:schema.create({
            title: schema.string(),
            body: schema.string(),
        }),
        messages: {
            'title.required': 'Title required11',
            'body.required': 'Body required11',
        } 
    })
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

    public async profile({ request, response, auth, view, params }: HttpContextContract){
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
