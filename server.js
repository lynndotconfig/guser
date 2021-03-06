// var PROTO_PATH = __dirname + '/protos/user.proto';
var path = require('path')

const proto = {
    file: 'user.proto',
    root: path.resolve(__dirname, 'proto')
}

var _ = require('lodash')
var grpc =  require('grpc')
var usermanage = grpc.load(proto).usermanage
var bookshelf = require('./db').bookself
var User = require('./model').User

// function checkUser(userInfo) {
//     User.forge({ username: 'magrate' })
//         .fetch()
//         .then(function (rows) {
//             console.log(row)
//         })
//     console.log(user)
// }

function forgeUser(filter, cb) {
    User.forge(filter).fetch().then(function (row) {
        let attr =  row.attributes
        let user = {
            id: attr.id,
            name: attr.name,
            email: attr.email,
            ou: attr.ou,
            password: attr.password
        }
        // console.log(typeof user.id)
        // console.log(user)
        return cb(null, user)
    } )
}

function getUser(call, callback) {
    // cb(null, checkUser(call.request))
    var name = call.request.name
    forgeUser({ name: name }, function (err, user) {
        if(err) {
            console.log(err)
            return
        }
        console.log('user in getUser: ', user)
        callback(null, user)
    })
}

function createUser(call, callback) {
    var user = {
        name: call.request.name,
        email: call.request.email,
        ou: call.request.ou,
        password: call.request.password
    }
    new User(user).save().then(function (row) {
        let ret = row.attributes
        let retUser = {
            id: ret.id,
            name: ret.name,
            email: ret.email,
            ou: ret.ou,
            password: ret.password
        }
        callback(null, retUser)
    })
}

function deleteUser(call, callback) {
    let name = call.request.name
    User.where({ name: name }).destroy().then(function (row) {
        let ret = {
            status: 'ok',
            name: name
        }
        callback(null, ret)
    })
}

function listUser(call) {
    User.fetchAll().then(function (data) {
        let models = data.models
        _.each(models, function (item) {
            let ret = item.attributes
            let retUser = {
                id: ret.id,
                name: ret.name,
                email: ret.email,
                ou: ret.ou,
                password: ret.password
            }
            console.log(retUser)
            call.write(retUser)
        })
        call.end()
    })
}

function searchUser(call, callback) {
    var count = 0
    var users = []
    call.on('data', function (searchName) {
        console.log('request name: ', searchName)
        forgeUser({name: searchName.name }, function (err, data) {
            if(err) { return}
            else {
                count += 1
                console.log('in searchUser: ', data)
                users.push(data)
                // console.log('in users: ', users)
            }
        })
    })

    call.on('end', function () {
        console.log('in end ')
        callback(null, {
            count: count,
            users: users
        })
    })
}

function getServer() {
    var server = new grpc.Server()
    server.addService(usermanage.UserManage.service, {
        getUser: getUser,
        createUser: createUser,
        deleteUser: deleteUser,
        listUser: listUser,
        searchUser: searchUser
    })
    return server
}

if (require.main === module) {
    var userServer = getServer()
    userServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
    userServer.start()
}

exports.getServer = getServer