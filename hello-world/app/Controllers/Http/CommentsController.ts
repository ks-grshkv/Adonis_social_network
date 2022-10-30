import Comment from "App/Models/Comment"
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateCommentValidator from 'App/Validators/CreateCommentValidator'

export default class CommentsController {

    public async store({ request, response, params, auth }: HttpContextContract){
        const payload = await request.validate(CreateCommentValidator)
        const new_comment = new Comment()
        new_comment.body = payload.body
        new_comment.news_id = params.news_id
        
        // if (auth.isAuthenticated && auth.user){
        //     new_comment.userId = auth.user.id
        // }
        await new_comment.save()

        return response.redirect('back')
    }

}
