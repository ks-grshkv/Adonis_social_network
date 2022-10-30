import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import News from 'App/Models/News'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public body: string

  @column()
  public user_id: number

  @column()
  public news_id: number

  @belongsTo(() => News, {
    foreignKey: 'news_id',
  })
  public news: BelongsTo<typeof News>

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
