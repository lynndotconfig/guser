var path = require('path')
var _ = require('lodash')

const proto = {
    file: 'user.proto',
    root: path.resolve(__dirname, 'proto')
}

var grpc =  require('grpc')
var usermanage = grpc.load(proto).usermanage

var client = new usermanage.UserManage('localhost:50051', grpc.credentials.createInsecure())

function runGetUser() {
    var userSearch = {
        name: 'margaret'
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
    // let requestUser = {
    //     name: 'margaret',
    //     email: 'margaret@wangsu.com',
    //     ou: 'OU=CTXUsers,OU=Citrix,DC=dev1,DC=com',
    //     password: '12345'
    // }
    // let requestUser = {
    //     name: 'john',
    //     email: 'john@wangsu.com',
    //     ou: 'OU=CTXUsers,OU=Citrix,DC=dev1,DC=com',
    //     password: '12345'
    // }
    // let requestUser = {
    //     name: 'dixon',
    //     email: 'dixon@wangsu.com',
    //     ou: 'OU=CTXUsers,OU=Citrix,DC=dev1,DC=com',
    //     password: '12345'
    // }
    let requestUser = {
        name: 'maria',
        email: 'maria@wangsu.com',
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

function runListUser() {
    let ids = [10,11,12,13]
    var call = client.listUser()
    call.on('data', function (user) {
        console.log('fetch user: ', user)
    })
    call.on('end', function (err, data) {
        console.log('end in client: ', err, data)
    })
}

function runSearchUser() {
    var names = ['margaret', 'john', 'dixon']
    var call = client.searchUser(function (err, data) {
        if(err) return
        else {
            console.log('SearchUser return: ', data)
        }
    })
    _.each(names, function (name) {
        call.write(name)
    })
    setTimeout(function() {
        call.end()
    }, 2000);
}

function main() {
    // runGetUser()
    // runCreateUser()
    // runDeleteUser()
    // runListUser()
    runSearchUser()
}

if(require.main === module ) {
    main()
}

exports.runGetUser = runGetUser