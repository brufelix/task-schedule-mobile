module.exports = {

  client: 'postgresql',
  connection: {
    database: 'nameDatabase',
    user: 'user',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
