const fs = require('fs')

class ProductManager {
    constructor () {
        this.productosFile = "productos.json"
        this.nextId = 1
    }

    addProduct (product) {
        try {
            if(!this.isProductValid(product)) {
                console.log(`Error: El producto no es válido`)
                return
            } else if (this.isCodeDuplicate(product.code)){
                console.log(`Error: El código del producto "${product.title}" ya está en uso`)
                return
            } else {
                let products = this.leerProductos()
                
                product.id = this.nextId++
    
                products.push(product)
                fs.writeFileSync(this.productosFile, JSON.stringify(products, null, 2))
                console.log("Producto agregado correctamente")
            }
        } catch (error) {
            console.error("Error al agregar el producto", error)
            return
        }
    }

    getProducts () {
        try {
            return this.leerProductos()
        } catch (error) {
            console.error("Error al obtener los productos", error)
            return []
        }
    }

    getProductById (id) {
        try {
            const product = this.leerProductos().find((p) => p.id === id)
            if (product) {
                return product
            } else {
                console.log("Error: Producto no encontrado")
            }
        } catch (error) {
            console.error("Error al obtener el producto\n",error)
        }
    }

    deleteProduct (id) {
        try {
            const products = this.leerProductos().filter((p) => p.id !== id)
            fs.writeFileSync(this.productosFile, JSON.stringify(products, null, 2))
            console.log("Producto eliminado con exito")
        } catch (error) {
            console.error("Error al eliminar el producto\n",error)
        }
    }

    upDateProduct (id, producto) {
        try {
            const product_index = this.leerProductos().findIndex((p) => p.id === id)
            let products = this.leerProductos()
            if (product_index > -1) {
                products[product_index] = producto
                products[product_index].id = id
                fs.writeFileSync(this.productosFile, JSON.stringify(products, null, 2))
                console.log("Producto actualizado con exito")
            } else {
                console.log("Error: Producto no encontrado")
            }
        } catch (error) {
            console.error("Error: No se pudo actualizar el producto\n",error)
        }
    }

    leerProductos () {
        try {
            const data = fs.readFileSync(this.productosFile, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            if(error.code === 'ENOENT') {
                return []
            } else {
                throw error
            }
        }
    }

    isProductValid (product) {
        return (
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        )
    }

    isCodeDuplicate (code) {
        const products = this.leerProductos()
        return products.some((p) => p.code === code)
    }
}

module.exports = ProductManager