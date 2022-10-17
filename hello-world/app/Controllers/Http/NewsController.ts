'use strict'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import News from 'App/Models/News'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class NewsController {
    public async index({ request, auth, response, view }: HttpContextContract){
        const news =await News.all()
        
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
        if (auth.isAuthenticated == true)
            new_post.author = auth.user.name
        else
            new_post.author = 'unknown kapibara'
        new_post.save()

        return response.redirect('/')
    }
}
