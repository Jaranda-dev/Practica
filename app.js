import express from 'express'
import cors from 'cors'
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
import authRoutes from './routes/authRoutes.js'
import rolesRutes from  './routes/rolesRoutes.js'



const app = express()
const port = 44221

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use(express.json())
app.use('/actor', actorRoutes)
app.use('/address', addressRoutes)
app.use('/category', categoryRoutes)
app.use('/city', cityRoutes)
app.use('/country', countryRoutes)
app.use('/customer', customerRoutes)
app.use('/film', filmRoutes)
app.use('/inventory', inventoryRoutes)
app.use('/language', languageRoutes)
app.use('/payment', paymentRoutes)
app.use('/rental', rentalRoutes)
app.use('/staff', staffRoutes)
app.use('/store', storeRoutes)
app.use('/film_actor', filmActorRoutes)
app.use('/film_category', filmCategoryRoutes)
app.use('/film_text', filmTextRoutes)
app.use('/auth',authRoutes)
app.use('/roles',rolesRutes)
app.use('/tablas', (req, res) => {
  const tablas = [
    "actor",
    "customer",
    "film",
    "film_actor",
    "film_category",
    "film_text",
    "inventory",
    "payment",
    "rental",
    "staff",
    
  ]

  const tablasConTitulo = tablas.map(tabla => ({ title: tabla }))
  res.send({ data: tablasConTitulo })
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})