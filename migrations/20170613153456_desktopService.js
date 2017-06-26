
exports.up = function(knex, Promise) {
  return knex.schema
    .createTableIfNotExists('activeTask', function (table) {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('category').notNullable()
        table.string('action').notNullable()
        table.string('status').notNullable()
        table.string('operator')
        table.string('payload')
        table.string('metadata').notNullable()
        table.timestamps()
    })
    .createTableIfNotExists('historyTask', function(table) {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('category').notNullable()
        table.string('action').notNullable()
        table.string('status').notNullable()
        table.string('operator')
        table.string('payload')
        table.string('metadata').notNullable()
        table.timestamps()
    })
    .createTableIfNotExists('site', function (table) {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('category').notNullable()
        table.string('action').notNullable()
        table.string('status').notNullable()
        table.string('operator').notNullable()
        table.string('payload')
        table.string('metadata')
        table.timestamps()
    })
};

exports.down = function(knex, Promise) {
  
};
