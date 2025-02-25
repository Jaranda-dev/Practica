const express = require('express')
const app = express()
const port = 44221

app.get('/', (req, res) => {
    res.send('Hola')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})