
exports.up = function(knex, Promise) {
  return knex.schema
    .createTableIfNotExists('user', function (table) {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('email')
        table.string('ou')
        table.string('password').notNullable()
        table.timestamps()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('user')
};

exports.config = { transaction: false }