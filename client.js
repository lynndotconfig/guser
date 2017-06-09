var path = require('path')

const proto = {
    file: 'user.proto',
    root: path.resolve(__dirname, 'proto')
}

var grpc =  require('grpc')
var usermanage = grpc.load(proto).usermanage

var client = new usermanage.UserManage('localhost:50051', grpc.credentials.createInsecure())

function runGetUser() {
    var userSearch = {
        name: 'magrate'
    }
    client.getUser(userSearch, function(err, user) {
        if(err) {
            console.log('err: ', err)
            return
        } else {
            console.log('return: ', user)
        }
    })
}

function runCreateUser() {
    let requestUser = {
        name: 'margaret',
        email: 'margaret@wangsu.com',
        ou: 'OU=CTXUsers,OU=Citrix,DC=dev1,DC=com',
        password: '12345'
    }
    client.createUser(requestUser, function (err, user) {
        if(err) {
            console.log('err:', err)
            return
        } else {
            console.log('created: ', user)
        }
    })
}

function runDeleteUser() {
    let userSearch = {
        name: 'margaret'
    }
    client.deleteUser(userSearch, function (err, user) {
        if(err) {
            console.log('err: ', err)
            return
        } else {
            console.log('return: ', user)
        }
    })
}
function main() {
    // runGetUser()
    // runCreateUser()
    runDeleteUser()
}

if(require.main === module ) {
    main()
}

exports.runGetUser = runGetUser