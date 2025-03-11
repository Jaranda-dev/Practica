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
import staffRoutes from './routes/staffRoutes.js'
import storeRoutes from './routes/storeRoutes.js'
import filmActorRoutes from './routes/filmActorRoutes.js'
import filmCategoryRoutes from './routes/filmCategoryRoutes.js'
import filmTextRoutes from './routes/filmTextRoutes.js'

const app = express()
const port = 44221

app.use(express.json())
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
app.use('/personal', staffRoutes)
app.use('/tiendas', storeRoutes)
app.use('/peliculasActores', filmActorRoutes)
app.use('/peliculasCategorias', filmCategoryRoutes)
app.use('/peliculasTextos', filmTextRoutes)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})