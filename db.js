var Knex = require('knex')
var Bookshelf = require('bookshelf')
var knexfile = require('./knexfile').development

const knex = Knex(knexfile)
const bookshelf = Bookshelf(knex)
bookshelf.plugin('registry')
bookshelf.plugin('pagination')

exports.bookshelf = bookshelf
exports.knex = knex
