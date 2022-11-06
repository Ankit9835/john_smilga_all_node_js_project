require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const connectDb = require('./db/connect')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

const authRoutes = require('./routes/auth')
const jobsRoutes = require('./routes/jobs')

app.use('/api/v1/auth/',authRoutes)
app.use('/api/v1/jobs',jobsRoutes)
// extra packages



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
