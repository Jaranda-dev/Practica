import express from 'express'
import actorRoutes from './routes/actorRoutes.js'
import addressRoutes from './routes/addressRoutes.js'

const app = express()
const port = 44221

app.use('/actores', actorRoutes)
app.use('/direcciones', addressRoutes)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})