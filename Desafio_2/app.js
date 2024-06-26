const ProductManager = require('./ProductManager.js')

const productManager = new ProductManager()


writeProducts = async () => {
    await productManager.addProduct({
        title: "Product A",
        description: "Descripción del producto A",
        price: 10.99,
        thumbnail: 'ruta/imagenA.jpg',
        code: "P001",
        stock: 10
    })
    await productManager.addProduct({
        title: "Product B",
        description: "Descripción del producto B",
        price: 8.99,
        thumbnail: 'ruta/imagenB.jpg',
        code: "P002",
        stock: 7
    })
    await productManager.addProduct({
        title: "Product C",
        description: "Descripción del producto C",
        price: 8.99,
        thumbnail: 'ruta/imagenC.jpg',
        code: "P003",
        stock: 7
    })
    await productManager.addProduct({ // Falta el atributo "description"
        title: "Product D",
        price: 8.99,
        thumbnail: 'ruta/imagenD.jpg',
        code: "P004",
        stock: 7
    })
    await productManager.addProduct({ // Coincide el atributo "code" con el producto "C"
        title: "Product E",
        description: "Descripción del producto E",
        price: 8.99,
        thumbnail: 'ruta/imagenE.jpg',
        code: "P003",
        stock: 7
    })
}

const test = async () => {
    console.log("\n////////// TEST METODO: addProduct() //////////\n")
    await writeProducts()

    console.log("\n////////// TEST METODO: getProducts() //////////\n")
    const products = await productManager.getProducts()
    console.log(products)

    console.log("\n////////// TEST METODO: getProductsById(2) //////////\n")
    const product = await productManager.getProductById(2)
    console.log(product)
    
    console.log("\n////////// TEST METODO: deleteProduct(2) //////////\n")
    await productManager.deleteProduct(2)
    const products_post_delete = await productManager.getProducts()
    console.log(products_post_delete)
    
    console.log("\n////////// TEST METODO: upDateProduct(1) //////////\n")
    await productManager.upDateProduct(1,{
        title: "Product A",
        description: "Descripción del producto A",
        price: 10.99,
        thumbnail: 'ruta/imagenA.jpg',
        code: "P001",
        stock: 20
    })
    const products_post_update = await productManager.getProducts()
    console.log(products_post_update)
}

test()