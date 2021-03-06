const router = require ('express').Router()
const UserController = require('../controller/userController')
const ProductController = require ('../controller/productController')
const { authentication, authorization } = require ('../middleware/auth')

router.post(`/register`, UserController.registerUser)
router.post(`/login`, UserController.login)
router.get(`/product`, ProductController.getAllProducts)
router.use(authentication)
router.post('/cart', ProductController.addToCart)
router.get('/cart', ProductController.getCart)
router.patch('/cart/:id', ProductController.updateCheckout)
router.delete('/cart/:id', ProductController.deleteCart)
router.put('/checkout', ProductController.checkout)
router.post(`/product`, authorization,ProductController.createProduct)
router.get(`/product/:id`, authorization,ProductController.getProduct)
router.put(`/product/:id`, authorization,ProductController.editProduct)
router.delete(`/product/:id`, authorization, ProductController.deleteProduct)

module.exports = router