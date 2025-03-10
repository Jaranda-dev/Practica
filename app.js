import express from 'express'
import actorRoutes from './routes/actorRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cityRoutes from './routes/cityRoutes.js'
import countryRoutes from './routes/countryRoutes.js'

const app = express()
const port = 44221

app.use('/actores', actorRoutes)
app.use('/direcciones', addressRoutes)
app.use('/categorias', categoryRoutes)
app.use('/ciudades', cityRoutes)
app.use('/paises', countryRoutes)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})