// var PROTO_PATH = __dirname + '/protos/user.proto';
var path = require('path')

const proto = {
    file: 'user.proto',
    root: path.resolve(__dirname, 'proto')
}

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
            password: attr.password
        }
        console.log(typeof user.id)
        console.log(user)
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

function getServer() {
    var server = new grpc.Server()
    server.addService(usermanage.UserManage.service, {
        getUser: getUser
    })
    return server
}

if (require.main === module) {
    var userServer = getServer()
    userServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
    userServer.start()
}

exports.getServer = getServer