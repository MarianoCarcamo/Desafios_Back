const ProductManager = require('./ProductManager.js')

const productManager = new ProductManager()

console.log("\n////////// TEST METODO: addProduct() //////////\n")

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

productManager.addProduct({ // Coincide el atributo "code" con el producto anterior
    title: "Product C",
    description: "Descripción del producto C",
    price: 8.99,
    thumbnail: 'ruta/imagenC.jpg',
    code: "P003",
    stock: 7
})

productManager.addProduct({ // Falta el atributo "description"
    title: "Product D",
    price: 8.99,
    thumbnail: 'ruta/imagenD.jpg',
    code: "P002",
    stock: 7
})

productManager.addProduct({ // Coincide el atributo "code" con el producto anterior
    title: "Product E",
    description: "Descripción del producto E",
    price: 8.99,
    thumbnail: 'ruta/imagenE.jpg',
    code: "P003",
    stock: 7
})


console.log("\n////////// TEST METODO: getProducts() //////////\n")
const productos = productManager.getProducts()
console.log(productos)

console.log("\n////////// TEST METODO: getProductsById(2) //////////\n")
const producto = productManager.getProductById(2)
console.log(producto)

console.log("\n////////// TEST METODO: deleteProduct(2) //////////\n")
productManager.deleteProduct(2)
const productos_post_delete = productManager.getProducts()
console.log(productos_post_delete)

console.log("\n////////// TEST METODO: upDateProduct(1) //////////\n")
productManager.upDateProduct(1,{
    title: "Product A",
    description: "Descripción del producto A",
    price: 10.99,
    thumbnail: 'ruta/imagenA.jpg',
    code: "P001",
    stock: 20
})
const productos_post_update = productManager.getProducts()
console.log(productos_post_update)