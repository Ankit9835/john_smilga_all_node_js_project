require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
// connect db
const connectDB = require('./db/connect')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/',(req,res) => {
    res.send('ecommerce api')
});

app.get('/api/v1',(req,res) => {
    console.log(req.signedCookies)
    res.send('ecommerce api')
});

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/products', productRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT_NO || 3000
const start =  async (req,res) => {
    try{
       await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`server is listening to port ${port}`))
    } catch (error){
        console.log(error)
    }
}

start()
