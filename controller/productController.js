const { Product, Cart } = require ('../models')

class ProductController {
    static createProduct(req, res, next) {
        console.log(req.body, `<<<<<`)
        const { productName, image_url, price, stock, availableSize, category, description } = req.body
        console.log(req.body)
        Product
            .create({
                productName,
                image_url,
                price,
                stock,
                category,
                availableSize,
                description
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.send(err)
                console.log(err)
                // next(err)
            })
    }

    static getAllProducts (req, res, next) {
        const category = req.query.category
        if (category) {
            Product
                .findAll({
                    where: {
                        category
                    }
                })
                .then(data => {
                    res.status(200).json(data)
                })
                .catch( err =>{
                    next(err)
                })
        } else {
            Product
                .findAll()
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(err => {
                    next(err)
                })
        }
    }

    static getProduct(req, res, next) {
        const { id } = req.params
        Product
            .findByPk(id)
            .then(data => {
                if (!data) {
                    throw { 
                        name: `not found`
                    }
                } else {
                    res.status(200).json(data)
                }
            })
            .catch( err => {
                next(err)
            })
    }

    static editProduct(req, res, next) {
        const { id } = req.params
        const { productName, image_url, price, stock } = req.body
        Product
            .update({
                productName,
                image_url,
                price,
                stock
            }, { where: { id }})
            .then( _ => {
                res.status(200).json(`product updated`)
            })
            .catch( err => {
                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        const { id } = req.params
        Product
            .destroy({
                where: {id}
            })
            .then(_ => {
                res.status(200).json(`product deleted`)
            })
            .catch( err => {
                next(err)
            })
    }

    static addToCart(req, res, next) {
        console.log(req.body)
        const { productName, amount, price, ProductId, image_url } = req.body
        const UserId = req.decoded.id
        Cart
            .create({
                productName,
                amount,
                price,
                UserId,
                ProductId,
                image_url
            })
            .then( data => {
                res.status(201).json(data)
            })
            .catch( err => {
                next(err)
            })
            
    }

    static getCart(req, res, next){
        Cart
            .findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteCart(req, res, next){
        console.log(req.params)
        const { id } = req.params
        Cart
            .destroy({
                where: { id }
            })
            .then(data => {
                res.status(200).json(`success delete item from cart`)
            })
            .catch( err => {
                next(err)
            })
    }

    static checkout(req, res, next){
        console.log(req.body)
    }

    static updateCheckout(req, res, next){
        const { checkout } = req.body
        const { id } = req.params
        Cart
            .update({
                checkout
            }, { where: {id}})
            .then( data => {
                res.status(200).json('success update')
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController