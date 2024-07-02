import * as cartManager from '../services/carts.service.js'

export async function getProductsInCart(req,res) {
    const id = req.params.cartId
    try {
        const products = await cartManager.getProductsInCart(id)
        res.send(products)
    } catch (error) {
        res.status(404).json({
            ERROR: `${error.message}`,
        })
    }
}

export async function addProductInCart(req,res) {
    const cartId = req.params.cartId
    const prodId = req.params.productId
    try {
        await cartManager.addProductInCart(cartId,prodId)
        res.redirect(`/carts/${cartId}`)
    } catch (error) {
        res.status(400).json({ ERROR: `${error.message}` })
    }
}

export async function createCart(req,res) {
    try {
        const result = await cartManager.createCart()
        res.json({ message: 'Carrito creado con exito', result })
    } catch (error) {
        res.status(400).json({ ERROR: `${error.message}` })
    }
}

export async function deleteProductInCart(req,res) {
    const { cartId, productId } = req.params
    try {
        await cartManager.deleteProductInCart(cartId, productId)
        res.json({
            status: 'success',
            message: 'Producto eliminado del carrito',
        })
    } catch (error) {
        res.status(400).json({ ERROR: `${error.message}` })
    }
}

export async function updateProductQuantity(req,res) {
    const { cartId, productId } = req.params
    const { quantity } = req.body
    try {
        await cartManager.updateProductQuantity(cartId, productId, quantity)
        res.json({
            status: 'success',
            message: 'Operacion realizada con exito!',
        })
    } catch (error) {
        res.status(400).json({ ERROR: `${error.message}` })
    }
}

export async function deleteAllProductsInCart(req,res) {
    const { cartId } = req.params
    try {
        await cartManager.deleteAllProductsInCart(cartId)
        res.json({
            status: 'success',
            message: 'Operacion realizada con exito!',
        })
    } catch (error) {
        res.status(400).json({ ERROR: `${error.message}` })
    }
}

export async function addProductsInCart(req,res) {
    const { cartId } = req.params
    const { payload } = req.body
    try {
        await cartManager.addProductsInCart(cartId, payload)
        res.json({
            status: 'success',
            message: 'Operacion realizada con exito!',
        })
    } catch (error) {
        res.status(400).json({ ERROR: `${error.message}` })
    }
}