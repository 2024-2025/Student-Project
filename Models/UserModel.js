const mongoose = require('mongoose')
const joi = require('joi');

const UserSchema = new mongoose.Schema({

    UserName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: false
    },

    Role: {
        type: String,
        required: true,
        default: "User",
        enum: ["User", "Admin"]
    }
    ,
    Status: {
        type: String,
        required: true,
        default: "Active",
        enum:["Active","Pending","Blocked"]
    },
    Profile: {
        type: String,
        required: false,
    }
}, { timestamps: true });



const UserModel = mongoose.model('user', UserSchema)


const UserValidation = (UV) => {
    let uservalidation = joi.object({

        UserName: joi.string().required(),
        Email: joi.string().required().email(),
        Password: joi.string().required(),
        Status: joi.string().required(),
        Role: joi.string().required()

    })

    return uservalidation.validate(UV);
}

module.exports = {
    UserValidation,
    UserModel
}