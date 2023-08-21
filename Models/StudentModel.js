const mongoose = require('mongoose')

const joi = require('joi');

const StudentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    Gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    Address: {
        type: String,
        required: true
    },
    Balance: {
        type: Number,
        required: false,
        default: "10"
    },
    TotalAmount: {
        type: Number,
        required: false,
        default: "10"

    },
    AmountPaid:{
        type:Number,
        required:false,
        default:"0"
    },
    Status: {
        type: String,
        required: false,
        enum: ['UnPaid', "FullPaid", "PerceialPaid"],
        default: "UnPaid"
    },
}, { timestamps: true });


const StudentModel = mongoose.model('student', StudentSchema)

const StudentValidation = (SV) => {

    let studentvalidation = joi.object({
        Name: joi.string().required(),
        Phone: joi.number().required(),
        Gender: joi.string().required(),
        Address: joi.string().required()
    })

    return studentvalidation.validate(SV)
}

module.exports = {
    StudentModel,
    StudentValidation
}