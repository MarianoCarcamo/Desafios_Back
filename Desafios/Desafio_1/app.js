class ProductManager {
    constructor () {
        this.products = []
        this.nextId = 1
    }

    addProduct (product) {
        if(!this.isProductValid(product)) {
            console.log(`Error: El producto ${product} no es válido`)
            return
        }

        if(this.isCodeDuplicate(product.code)){
            console.log(`Error: El código del producto "${product.title}" ya está en uso`)
            return
        }

        product.id = this.nextId++
        this.products.push(product)
    }

    getProducts () {
        return this.products
    }

    getProductById (id) {
        const product = this.products.find((p) => p.id === id)
        if (product) {
            return product
        } else {
            console.log("Error: Producto no encontrado")
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
        return this.products.some((p) => p.code === code)
    }
}

const productManager = new ProductManager()

productManager.addProduct({
    title: "Product A",
    description: "Descripción del producto A",
    price: 10.99,
    thumbnail: 'ruta/imagenA.jpg',
    code: "P001",
    stock: 10
})

productManager.addProduct({
    title: "Product B",
    description: "Descripción del producto B",
    price: 8.99,
    thumbnail: 'ruta/imagenB.jpg',
    code: "P002",
    stock: 7
})

productManager.addProduct({
    title: "Product C",
    description: "Descripción del producto C",
    price: 8.99,
    thumbnail: 'ruta/imagenC.jpg',
    code: "P002",
    stock: 7
})

const productos = productManager.getProducts()
const producto = productManager.getProductById(2)

console.log(productos)
console.log(producto)