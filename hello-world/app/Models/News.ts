import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Comment from 'App/Models/Comment'


export default class News extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Comment, {
    foreignKey: 'news_id',
  })
  public comments: HasMany<typeof Comment>

  @column()
  public userId: number

  @belongsTo(() => User, {})
  public user: BelongsTo<typeof User>

  @hasMany(() => Comment)
  public posts: HasMany<typeof Comment>

  @column()
  public title: string

  @column()
  public body: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
 