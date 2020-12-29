const { User } = require ('../models')
const jwt = require('jsonwebtoken')
const bcryptjs = require ('bcryptjs')

class UserController {
    static registerUser(req, res, next) {
        const { name, email, password, address } = req.body
        User
            .create({
                name,
                email,
                password,
                address
            })
            .then(user => {
                const { id, name, email, address } = user
                res.status(201).json({
                    id,
                    name,
                    email,
                    address
                })
            })
            .catch(err => {
                next(err)
            })
    }


    static login(req, res, next){
        console.log(req.body)
        const { email, password } = req.body
        User
            .findOne({
                where: {
                    email
                }
            })
            .then(user => {
                const { id, name, email, role } = user
                if (!user){
                    throw { name: `email/password is wrong`}
                } else {
                    const validatePassword = bcryptjs.compareSync(password, user.password)
                    if (validatePassword) {
                        const access_token = jwt.sign({ id, name, email, role }, `JWT_SECRET`) 
                        res.status(200).json({ access_token })
                    } else {
                        throw { name: `email/password is wrong`}
                    } 
                }
                
            })
            .catch( err => {
                console.log(err)
            })
    }
}

module.exports = UserController