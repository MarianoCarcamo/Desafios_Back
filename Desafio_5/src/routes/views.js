import { Router } from 'express'
import ProductManager from '../dao/mongoDB/productManager.js'
import CartManager from '../dao/mongoDB/cartManager.js'
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js';

const router = Router()
const productManager = new ProductManager()
const cartManager = new CartManager()

router.get('/products', async (req, res) => {
    try {
        const response = await productManager.getProducts(req)
        response.payload = response.payload.map((element) => element.toObject()) // Hago del payload objetos planos
        const result = {
            "response":response,
            "user":req.session.user,
            "isAdmin": req.session.user.rol === "admin"
        }
        res.render('productsView', result)
    } catch (error) {
        throw error
    }
})

router.get('/carts/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params
        let result = await cartManager.getProductsInCart(cartId)
        result = result.map((element) => element.toObject())
        res.render('cartProductsView', { result: result })
    } catch (error) {
        throw error
    }
})

router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('loginView');
});

router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('registerView');
});

router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profileView', { user: req.session.user });
});

export default router

