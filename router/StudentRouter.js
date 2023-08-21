const express = require('express')

const { StudentModel, StudentValidation } = require('../Models/StudentModel');


const router = express.Router()

router.get('/', async (req, res) => {

    let GetStudent = await StudentModel.find()
    res.send(GetStudent)
})
router.get('/:id', async (req, res) => {

    let { id } = req.params;
    let GetStudent = await StudentModel.findById(id)
    res.send(GetStudent)
})

router.post('/', async (req, res) => {

    try {
        let { error } = StudentValidation(req.body)
        if (error) return res.send(error.message)

        let Insert = await StudentModel.create(req.body)
        res.send({
            status: "Success",
            message: "Successfully Inserted Data Student",
            info: Insert
        })

    } catch (error) {

        res.send(error.message)

    }
})

router.put('/:id', async (req, res) => {

    let { id } = req.params;

    let Update = await StudentModel.findByIdAndUpdate(id, req.body, { new: true })
    res.send({
        status: "Success",
        message: "Successfully Update Data Student",
        info: Update
    })
})
router.delete('/:id', async (req, res) => {

    let { id } = req.params;

    let Update = await StudentModel.findByIdAndDelete(id)
    if (!Update) {
        res.send()
return
    }
    res.send({
        status: "Success",
        message: "Successfully Delete Data Student",
        info: Update
    })
})



module.exports = router;