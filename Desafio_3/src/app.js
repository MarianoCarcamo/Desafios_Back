const express = require("express")
const fs = require('fs').promises
const ProductManager = require('./ProductManager.js')
const loadProducts = require('./loadProducts.js') //Función para cargar productos al .json

const PORT = 8080

const app = express()
app.use(express.urlencoded( {extended:true} ))

const productManager = new ProductManager()

// FUNCIONES
const getProducts = async (quantity) => {
    if(quantity){
        return (await productManager.getProducts()).slice(0,quantity)
    } else {
        return await productManager.getProducts()
    }
}

// ENDPOINTS
app.get('/products', (req,res) => {
    const {limit} = req.query
    getProducts(limit).then( (p) => {
        res.send(p)
    })
})

app.get('/products/:idProduct', (req,res) => {
    const pid = Number(req.params.idProduct)
    productManager.getProductById(pid)
    .then( p => p ? res.send(p) : res.send({"ERROR":`El Producto de Id=${pid} no existe`}))
})

// CREO ARCHIVO CON LOS PRODUCTOS UNA UNICA VEZ
fs.stat("./productos.json")
.catch( error => {
    if (error.code === 'ENOENT'){
        loadProducts()
    } else {
        throw error
    }
})

// LEVANTO EL SERVER
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})