import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.string('body').notNullable()
      table.timestamp('updated_at', { useTz: true })

      table
      .integer('news_id')
      .unsigned()
      .references('news.id')
      .notNullable()
      .onDelete('CASCADE') // delete comment when post is deleted

      table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .nullable()
      .onDelete('CASCADE') // delete comment when user is deleted
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
