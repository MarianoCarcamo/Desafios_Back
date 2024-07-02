import express from 'express'
import * as controller from '../../controllers/products.controller.js'

const router = express.Router()

// ENDPOINTS
router.get ('/', controller.getAllProducts)
router.get ('/:idProduct', controller.getProductById)
router.post ('/', controller.createProduct)
router.put ('/:productId', controller.updateProduct)
router.delete ('/:productId', controller.deleteProduct)

export default router
