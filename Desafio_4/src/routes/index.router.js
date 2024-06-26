import express from 'express'
import ProductManager from '../services/productManager.js'

const router = express.Router()
const productManager = new ProductManager()

router.get('/', (req,res) => {
    productManager.getProducts().then( products => {
        res.render('index',{products: products})
    })
})
export default router