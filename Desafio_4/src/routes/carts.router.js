import express from 'express'
import CartManager from '../services/cartManager.js'

const router = express.Router()

const cartManager = new CartManager()

// ENDPOINTS
router.get('/:cartId', (req, res) => {
    const id = parseInt(req.params.cartId)
    cartManager
        .getProductsInCart(id)
        .then((products) => {
            res.send(products)
        })
        .catch((error) => {
            res.status(404).json({
                ERROR: `${error.message}`,
            })
        })
})

router.post('/:cartId/product/:productId', (req, res) => {
    const cartId = parseInt(req.params.cartId)
    const prodId = parseInt(req.params.productId)
    cartManager
        .addProductInCart(cartId, prodId)
        .then(() =>
            res.json({ Message: 'Producto agregado con exito al carrito' })
        )
        .catch((error) => {
            res.status(400).json({ ERROR: `${error.message}` })
        })
})

router.post('/', (req, res) => {
    cartManager
        .addCart()
        .then(() => {
            res.json({ message: 'Carrito creado con exito' })
        })
        .catch((error) => {
            res.status(400).json({ ERROR: `${error.message}` })
        })
})

export default router
