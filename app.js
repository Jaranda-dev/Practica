import express from 'express'
import actorRoutes from './routes/actorRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'

const app = express()
const port = 44221

app.use('/actores', actorRoutes)
app.use('/direcciones', addressRoutes)
app.use('/categorias', categoryRoutes)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})