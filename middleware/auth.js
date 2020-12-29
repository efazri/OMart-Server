const jwt = require ('jsonwebtoken')
const { User } = require ('../models')


function authentication (req, res, next) {
    const decoded = jwt.verify(req.headers.access_token, 'JWT_SECRET')
    User
        .findOne({
            where: {
                email: decoded.email
            }
        })
        .then(user => {
            if (!user) {
                throw { name: 'unauthorized access'}
            } else {
                req.decoded = decoded
                next()
            }
        })
        .catch( err => {
            next(err)
        })
}

function authorization (req, res, next) {
    User
        .findOne({
            where: {
                email : req.decoded.email
            }
        })
        .then( user => {
            if (!user) {
                throw {
                    name : `unauthorized access`
                }
            } else {
                if (user.role === 'admin') {
                    next()
                } else {
                    throw {
                        name: `forbidden`
                    }
                }
            }
        })
        .catch( err => {
            next(err)
        })
}


module.exports = {
    authentication,
    authorization
}