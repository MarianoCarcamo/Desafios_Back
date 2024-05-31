const ProductManager = require('./ProductManager.js')

const productManager = new ProductManager()

loadProducts = async () => {
    try{
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
        await productManager.addProduct({
            title: "Product D",
            description: "Descripción del producto D",
            price: 18.99,
            thumbnail: 'ruta/imagenD.jpg',
            code: "P004",
            stock: 8
        })
        await productManager.addProduct({
            title: "Product E",
            description: "Descripción del producto E",
            price: 28.99,
            thumbnail: 'ruta/imagenE.jpg',
            code: "P005",
            stock: 17
        })
        await productManager.addProduct({
            title: "Product F",
            description: "Descripción del producto F",
            price: 28.99,
            thumbnail: 'ruta/imagenF.jpg',
            code: "P006",
            stock: 17
        })
        await productManager.addProduct({
            title: "Product G",
            description: "Descripción del producto G",
            price: 28.99,
            thumbnail: 'ruta/imagenG.jpg',
            code: "P007",
            stock: 17
        })
        await productManager.addProduct({
            title: "Product H",
            description: "Descripción del producto H",
            price: 28.99,
            thumbnail: 'ruta/imagenH.jpg',
            code: "P008",
            stock: 17
        })
        await productManager.addProduct({
            title: "Product I",
            description: "Descripción del producto I",
            price: 28.99,
            thumbnail: 'ruta/imagenI.jpg',
            code: "P009",
            stock: 17
        })
        await productManager.addProduct({
            title: "Product J",
            description: "Descripción del producto J",
            price: 28.99,
            thumbnail: 'ruta/imagenJ.jpg',
            code: "P010",
            stock: 17
        })
    }
    catch{
        console.log("No se pudieron cargar los productos")
    }
}

module.exports = loadProducts