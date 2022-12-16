require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const orderRoutes = require('./routes/orderRoutes')

const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
// connect db
const connectDB = require('./db/connect')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.static('./public'));
app.use(fileUpload());

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
app.use('/api/v1/reviews', reviewRoutes)
app.use('/api/v1/orders', orderRoutes)

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
