var bookshelf = require('./db').bookshelf
var User = require('./model').User

// User.forge({name: 'magrate'}).fetch().then(function (row) {
//     let user = row.attributes
// })

// new User({
//     name: 'Jonh',
//     email: 'john@wangsu.com',
//     ou: 'OU=CTXUsers,OU=Citrix,DC=dev1,DC=com',
//     password: '12345'
// }).save()

// bookshelf.transaction(function (t) {
//     return new User({
//         name: 'Dixon',
//         email: 'dixon@wangsu.com',
//         ou: 'OU=CTXUsers,OU=Citrix,DC=dev1,DC=com',
//         password: '12345'
//     }).save(null, {transacting: t})
//     .then(function (user) {
//         console.log(user)
//     })
// }).catch(function (err) {
//     console.log(err)
// })

// User.where({name: 'Dixon'}).destroy().then(function (row) {
//     console.log(row)
// })

User.fetchAll().then(function (data) {
    // data.map(function (item) {
    //     console.log(item.attributes)
    // })
    users = data.filter(function (u, i) {
        if (u.get('name') === 'margaret') return true
    })
    console.log(users)
})

