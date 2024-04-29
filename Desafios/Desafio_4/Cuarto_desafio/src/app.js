import express from 'express'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import __dirname from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import indexRouter from './routes/index.router.js'
import realTimeProductsRouter from './routes/realTimeProducts.router.js'

const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, () => console.log(`Server's up and running on port ${PORT}`))
const socketServer = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded( {extended: true} ))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.set('socketServer', socketServer)
app.use(express.static(__dirname + '/public/'))

app.use('/', indexRouter)
app.use('/realTimeProducts', realTimeProductsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
