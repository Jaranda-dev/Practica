import express from 'express'
import actorRoutes from './routes/actorRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cityRoutes from './routes/cityRoutes.js'
import countryRoutes from './routes/countryRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import filmRoutes from './routes/filmRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import languageRoutes from './routes/languageRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import rentalRoutes from './routes/rentalRoutes.js'

const app = express()
const port = 44221

app.use('/actores', actorRoutes)
app.use('/direcciones', addressRoutes)
app.use('/categorias', categoryRoutes)
app.use('/ciudades', cityRoutes)
app.use('/paises', countryRoutes)
app.use('/clientes', customerRoutes)
app.use('/peliculas', filmRoutes)
app.use('/inventarios', inventoryRoutes)
app.use('/idiomas', languageRoutes)
app.use('/pagos', paymentRoutes)
app.use('/alquileres', rentalRoutes)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})