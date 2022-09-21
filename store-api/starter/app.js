require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const productRouter = require('./routes/products')

const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.get('/', (req, res) => {
  res.send('<h1>store api</h1>')
})

app.use('/api/v1/products', productRouter)

app.use(notFound)
app.use(errorHandler)

app.use(express.json())

const port = process.env.PORT || 8000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening to port no ${port}`))
  } catch (err) {
    console.log(err)
  }
}

start()
