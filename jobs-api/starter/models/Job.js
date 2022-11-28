const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'please provide company name'],
        maxLength:50
    },
    position:{
        type:String,
        required:[true,'please provide company name'],
        maxLength:50
    },
    status:{
        type:String,
        enum:['interview','pending','declined'],
        default:'pending',
        required:[true,'please provide company name'],
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'please provide user'],
    },
},{timestamps:true})

module.exports = mongoose.model('Job', jobSchema)