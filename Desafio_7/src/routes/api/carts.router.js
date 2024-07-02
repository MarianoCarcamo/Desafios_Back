import express from 'express'
import * as controller from '../../controllers/carts.controller.js'

const router = express.Router()

// ENDPOINTS
router.get('/:cartId', controller.getProductsInCart)
router.post('/:cartId/product/:productId', controller.addProductInCart)
router.post('/', controller.createCart)
router.delete('/:cartId/product/:productId', controller.deleteProductInCart)
router.put('/:cartId/product/:productId', controller.updateProductQuantity)
router.delete('/:cartId', controller.deleteAllProductsInCart)
router.put('/:cartId', controller.addProductsInCart)

export default router
