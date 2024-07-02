import * as dataProducts from '../dao/mongoDB/productsData.js'

const productNotFound = new Error('Producto no encontrado')

// Funciones Internas
function isProductValid(product) {
    return (
        product.title &&
        product.description &&
        product.code &&
        product.price &&
        product.category &&
        product.stock !== undefined
    )
}

function updateByField(product, updatedProduct) {
    for (const key of Object.keys(updatedProduct)) {
        product[key] = updatedProduct[key]
    }
    return product
}

async function isCodeDuplicate(code) {
    const products = await dataProducts.getAllProducts()
    return products.some((product) => product.code === code)
}

function getResponse(req, data) {
    const response = {
        status: 'success',
        payload: data.docs,
        totalPages: data.totalPages,
        page: data.page,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
    }
    if (data.hasPrevPage) {
        const prevURL = req.originalUrl.includes('page=')
            ? req.originalUrl.replace(
                  `page=${data.page}`,
                  `page=${data.prevPage}`
              )
            : `${req.originalUrl}&page=${data.prevPage}`
        response.prevLink = `${req.protocol}://${req.get('host')}${prevURL}`
    } else {
        response.prevLink = null
    }
    if (data.hasNextPage) {
        const nextURL = req.originalUrl.includes('page=')
            ? req.originalUrl.replace(
                  `page=${data.page}`,
                  `page=${data.nextPage}`
              )
            : `${req.originalUrl}&page=${data.nextPage}`
        response.nextLink = `${req.protocol}://${req.get('host')}${nextURL}`
    } else {
        response.nextLink = null
    }
    return response
}

//Funciones Externas
export async function createProduct(product) {
    try {
        if (!isProductValid(product)) {
            throw new Error('Producto invalido')
        } else if (await isCodeDuplicate(product.code)) {
            throw new Error(
                `El código del producto "${product.title}" ya está en uso`
            )
        } else {
            await dataProducts.createProduct(product)
        }
    } catch (error) {
        throw error
    }
}

export async function getProducts(req) {
    try {
        const { limit = 10, page = 1, sort, query } = req.query
        const queryObj = query ? JSON.parse(`{${query}}`) : {}
        const options = {
            limit: limit,
            page: page,
        }
        if (sort) options.sort = { price: sort }
        const response = getResponse(
            req,
            await dataProducts.getProductsPaginated(queryObj, options)
        )
        return response
    } catch (error) {
        throw error
    }
}

export async function getProductById(id) {
    try {
        const product = await dataProducts.getProductById(id)
        if (product) {
            return product
        } else {
            throw productNotFound
        }
    } catch (error) {
        throw error
    }
}

export async function deleteProduct(id) {
    try {
        const product = await dataProducts.deleteProduct(id)
        if (!product) {
            throw productNotFound
        }
    } catch (error) {
        throw error
    }
}

export async function updateProduct(id, product) {
    try {
        if (product.id !== undefined) {
            throw new Error('No se permite actualizar el id')
        }
        const old_product = await dataProducts.getProductById(id)
        if (!old_product) {
            throw productNotFound
        }
        const updated_product = updateByField(old_product, product)
        await dataProducts.updateProduct(id,updated_product)
    } catch (error) {
        throw error
    }
}
