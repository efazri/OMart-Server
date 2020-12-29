if (process.env.NODE_ENV != 'production') {
    require ('dotenv').config()
}
const express = require('express')
const app = express ()
const cors = require ('cors')
const router = require ('./routes')
const errorHandler = require ('./middleware/errorHandler')
const PORT = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`listening port: ${PORT}`)
})