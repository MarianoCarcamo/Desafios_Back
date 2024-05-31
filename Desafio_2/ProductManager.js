const fs = require('fs').promises

class ProductManager {
    constructor () {
        this.productosFile = "productos.json"
        this.nextId = 1
    }

    async addProduct (product) {
        try {
            if(!this.isProductValid(product)) {
                console.log(`Error: El producto no es válido`)
                return
            } else if (await this.isCodeDuplicate(product.code)){
                console.log(`Error: El código del producto "${product.title}" ya está en uso`)
                return
            } else {
                let products = await this.readProducts()
                
                product.id = this.nextId++
    
                products.push(product)
                await fs.writeFile(this.productosFile, JSON.stringify(products, null, 2))
                console.log("Producto agregado correctamente")
            }
        } catch (error) {
            console.error("Error al agregar el producto", error)
            return
        }
    }

    async getProducts () {
        try {
            return await this.readProducts()
        } catch (error) {
            console.error("Error al obtener los productos", error)
            return []
        }
    }

    async getProductById (id) {
        try {
            const product = (await this.readProducts()).find((p) => p.id === id)
            if (product) {
                return product
            } else {
                console.log("Error: Producto no encontrado")
            }
        } catch (error) {
            console.error("Error al obtener el producto\n",error)
        }
    }

    async deleteProduct (id) {
        try {
            const products = (await this.readProducts()).filter((p) => p.id !== id)
            await fs.writeFile(this.productosFile, JSON.stringify(products, null, 2))
            console.log("Producto eliminado con exito")
        } catch (error) {
            console.error("Error al eliminar el producto\n",error)
        }
    }

    async upDateProduct (id, producto) {
        try {
            const product_index = (await this.readProducts()).findIndex((p) => p.id === id)
            let products = await this.readProducts()
            if (product_index > -1) {
                products[product_index] = producto
                products[product_index].id = id
                await fs.writeFile(this.productosFile, JSON.stringify(products, null, 2))
                console.log("Producto actualizado con exito")
            } else {
                console.log("Error: Producto no encontrado")
            }
        } catch (error) {
            console.error("Error: No se pudo actualizar el producto\n",error)
        }
    }

    async readProducts () {
        try {
            const data = await fs.readFile(this.productosFile, 'utf8')
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

    async isCodeDuplicate (code) {
        const products = await this.readProducts()
        return products.some((p) => p.code === code)
    }
}

module.exports = ProductManager