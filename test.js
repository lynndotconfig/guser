var bookshelf = require('./db').bookself
var User = require('./model').User

User.forge({name: 'magrate'}).fetch().then(function (row) {
    console.log(row.attributes.name)
})