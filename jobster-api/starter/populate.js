require('dotenv').config()

const connectDB = require('./db/connect')
const Job = require('./models/job')

const jsonProducts = require('./mock-data.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Job.deleteMany()
    await Job.create(jsonProducts)
    process.exit(0)
    console.log('success')
  } catch (err) {
    console.log(err)
    prcess.exit(1)
  }
}

start()
