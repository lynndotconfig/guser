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

function main() {
    runGetUser()
}

if(require.main === module ) {
    main()
}

exports.runGetUser = runGetUser