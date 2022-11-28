const mongoose = require('mongoose')

<<<<<<< HEAD
const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'please provide company name'],
        maxLength:50
=======
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
>>>>>>> 6c102b2815a9eda48b30f3beb36a7326f1475232
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Job', JobSchema)
