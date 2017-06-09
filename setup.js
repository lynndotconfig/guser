var config = require('./knexfile').development
var Knex = require('knex')(config)
console.log(Knex.migrate.make)
// Knex.migrate.make('test', [ {transaction: false }])

Knex.migrate.latest()