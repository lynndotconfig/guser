var bookshelf = require('./db').bookshelf

exports.User = bookshelf.model('User', {
    tableName: 'user',
    hasTimestamps: true
})
