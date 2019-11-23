// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3', // the go to dbms for development purposes!
    useNullAsDefault: true, // needs to be added to default null
    connection: {
      filename: './data/FC.db3' //this is how knex knows what database to access and what to name it
    },
    migrations: {
      directory: './data/migrations' //initializing migrations will create this directory with a file in it
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      }
    }
  },
  testing: {
    client: 'pg',
    connection: {
      filename: './data/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  production: {
    client: 'pg',//pg
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  }

};