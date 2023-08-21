const express = require('express')

const router = express.Router();

const bcrypt = require('bcrypt')

const path = require('path')
const { UserModel, UserValidation } = require('../Models/UserModel');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, 'public/images')

    },

    filename: (req, file, cb) => {

        const ImageValidation = file.fieldname + "_" + Date.now() + path.extname(file.originalname)

        cb(null, ImageValidation)
    }


})

const Upload = multer({
    storage: storage,

    fileFilter: (req, file, cb) => {

        if (

            file.mimetype == "image/png" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/jpg"



        ) {
            cb(null, true)
        } else {
            console.log('you only Upload image png jpeg jpg')
            return

        }
        {
            cb(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 4
    }

}).single('Profile')

router.get('/', async (req, res) => {
    let UserGate = await UserModel.find()
    res.send(UserGate);
})
router.get('/:id', async (req, res) => {
    let { id } = req.params;
    let li = await UserModel.findById(id)
    res.send(li);
})

router.post('/', Upload, async (req, res) => {


    try {

        let { error } = UserValidation(req.body)
        if (error) return res.send(error.message);


        let salt = await bcrypt.genSalt(10);


        const Insert = new UserModel(req.body);
        
        const EmailFind=await UserModel.findOne({Email:req.body.Email});
        if(EmailFind) return res.send("Email Already Exist")

        if (req.file) {
            Insert.Profile = req.file.filename
        }

        Insert.Password = await bcrypt.hash(req.body.Password, salt);

        let info = await Insert.save()


        res.send({
            status: "Success",
            message: "SuccessFully Insert Data User",
            info: info
        })



    } catch (error) {
        res.send(error.message)

    }

})


router.put('/:id', Upload, async (req, res) => {
    let { id } = req.params;


    let Edit = await UserModel.findByIdAndUpdate(id, {

        Profile:req.body.file,
        // Password:req.body.Password,
        UserName:req.body.UserName,
        Email:req.body.Email,
        Role:req.body.Role,
        Status:req.body.Status
    }, { new: true });



    if (req.body.Password) {
        let salt = await bcrypt.genSalt(10);
        Edit.Password = await bcrypt.hash(req.body.Password, salt);
    }
    if (req.file) {
        Edit.Profile = req.file.filename
    }
    let info = await Edit.save()
    res.send({
        status: "Success",
        message: "Successfully Update Data User",
        info: info
    })

})

router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    let Remove = await UserModel.findByIdAndDelete(id)
    if(!Remove) return res.send()
    res.send({
        status: "Success",
        message: "Successfully Delete Data User",
        info: Remove
    })
})


module.exports = router;