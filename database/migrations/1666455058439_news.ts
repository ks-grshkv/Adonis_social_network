import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'news'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('title').notNullable()
      table.string('body').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE') // delete post when user is deleted
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
