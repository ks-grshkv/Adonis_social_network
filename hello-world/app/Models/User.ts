import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import News from 'App/Models/News'
import Comment from 'App/Models/Comment'

export default class User extends BaseModel {

  // @hasMany(() => News, {
  //   foreignKey: 'user_id', // defaults to userId
  // })
  // public news: HasMany<typeof News>

  // @hasMany(() => Comment, {
  //   foreignKey: 'author_id', // defaults to userId
  // })
  // public comments: HasMany<typeof Comment>

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @beforeSave()
  public static async hashpass(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
