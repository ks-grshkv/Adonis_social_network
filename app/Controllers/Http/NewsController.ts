

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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
        if (auth.user) { // лучше инвертировать условие и здесь сделать return, чтобы уменьшить уровень вложенности кода
            const new_post = await News.create({ //KAL: можно сократить за счет merge(payload)
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
        const news = await News
            .query()
            .where('id',  params.id)
            .preload('comments', (c) => { c.preload('user') });
        if (!news[0]) //KAL: Даже если у тебя одна строка внутри if, лучше все равно использовать скобки/ а еще лучше проверять как news.length === 0
            return view.render('errors.not-found')

        const news_author = await news[0].related('user').query().firstOrFail() //KAL: Тут что-то совсем мимо кассы; почему не сделать изначально .preload('user')? и почему не сделать изначально .first?
        // И вообще, если ты обращаешься к первому элементу массива, то, скорее всего, ты делаешь что-то не так

        return view.render('show_news', {
            news: news,
            news_author: news_author,
        })
    }
}
