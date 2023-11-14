
import express from 'express'
import productosRouter from './routes/productosRouter.js'
import carritoRouter from './routes/carritoRouter.js'
import { engine } from 'express-handlebars'
import { router as vistasRouter} from './routes/vistasRouter.js'
import { Server } from 'socket.io'
import __dirname from './utils.js'
import path from 'path'
import pm from './manager/productManager.js'
const productos=pm.getProducts()
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, './public')))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')


app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('home');
})


app.use('/api/productos', productosRouter)
app.use('/api/carts', carritoRouter)
app.use('/', vistasRouter)

const serverHTTP=app.listen(port, () => {
    console.log(`Server escuchando en puerto ${port}`);
})

const serverSockets=new Server(serverHTTP)

serverSockets.on("connection",socket=>{
    console.log(`se conecto un cliente con id ${socket.id}`)

    serverSockets.emit("productos",productos)
})