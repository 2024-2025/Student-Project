const mongoose = require('mongoose')

const joi = require('joi')

const ReceiptSchema = new mongoose.Schema({
    StudentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    
    ReceiptAmount: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: true,
        default: "Paid"
    },
})





const ReceiptModel = mongoose.model('receipt', ReceiptSchema)

const ReceiptValidation = (RV) => {

    let receiptvalidation = joi.object({
        StudentID: joi.string().required(),
        ReceiptAmount: joi.number().required()
    })

    return receiptvalidation.validate(RV)
}

module.exports = {
    ReceiptModel,
    ReceiptValidation
}