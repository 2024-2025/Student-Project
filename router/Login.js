const express = require('express');
const Joi = require('joi');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const router = express.Router();

const { UserModel } = require('../Models/UserModel')


router.post('/', async (req, res) => {

    let { error } = LoginValidation(req.body)
    if (error) return res.send(error.message);


    const UserData = await UserModel.findOne({ Email: req.body.Email });

    if (!UserData) return res.send(" Incorrect Email or Password ");


    const checkPass = await bcrypt.compare(req.body.Password, UserData.Password)


    if (!checkPass) return res.send(" Incorrect Email or Password ")


    const token = jwt.sign({

        id: UserData._id,
        UserName: UserData.UserName,
        
        
    }, 'lii',

        { expiresIn: 60 }
    )



    res.header('token', token).json({
        status: "Success",
        message: "Successfully Login in " + UserData.Role,
        token: token,
        Role:UserData.Role,
        UserData
    })









})

const LoginValidation = (LV) => {

    let loginvalidation = Joi.object({
        Email: Joi.string().required().email(),
        Password: Joi.string().required()
    })

    return loginvalidation.validate(LV)
}


module.exports = router;