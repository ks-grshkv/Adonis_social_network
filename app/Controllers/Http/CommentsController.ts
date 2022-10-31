import Comment from "App/Models/Comment"
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateCommentValidator from 'App/Validators/CreateCommentValidator'

export default class CommentsController {

    public async store({ request, response, params, auth }: HttpContextContract){
        if (auth.user){
            const payload = await request.validate(CreateCommentValidator)
            const new_comment = await Comment.create({
                user_id: auth.user?.id,
                body: payload.body,
                news_id: params.news_id
            })
            await new_comment.save()
            return response.redirect('back')
        }
        else
            return response.redirect('/login')

    }

}
