import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'


const Url = require('url-parse')
const DATABASE_URL = new Url(Env.get('DATABASE_URL'))

const databaseConfig: DatabaseConfig = {

  connection: Env.get('DB_CONNECTION'),

  connections: {

    // Driver for PostgreSQL: npm i pg
    pg: {
      client: 'pg',
      connection: {
        host: Env.get('PG_HOST', DATABASE_URL.hostname),
        port: Env.get('PG_PORT', DATABASE_URL.port),
        user: Env.get('PG_USER', DATABASE_URL.username),
        password: Env.get('PG_PASSWORD', DATABASE_URL.password),
        database: Env.get('PG_DB_NAME', DATABASE_URL.pathname.substr(1)),
        // The ssl: {...} parameter is only for heroku deployment.
        // To launch app locally, comment this part
        ssl: {
          rejectUnauthorized: false,
        },
      },
      
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },

  }
}

export default databaseConfig
