import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Comment from 'App/Models/Comment'
import News from 'App/Models/News'

export default class User extends BaseModel {

  @hasMany(() => Comment, {
    foreignKey: 'user_id', 
  })
  public comments: HasMany<typeof Comment>

  @hasMany(() => News, {
    foreignKey: 'user_id', 
  })
  public news: HasMany<typeof News>

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
