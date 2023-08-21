const express = require('express')

const { ClassModel, ClassValidation } = require('../Models/ClassModel')

const router = express.Router();

router.get('/', async (req, res) => {

    let GetData = await ClassModel.find();
    res.send(GetData);
})
router.get('/:id', async (req, res) => {

    let { id } = req.params;
    let GetData = await ClassModel.findById(id);
    res.send(GetData);
})


router.post('/', async (req, res) => {

    let { error } = ClassValidation(req.body)
    if (error) return res.send(error.message)

    let Insert = new ClassModel(req.body)

    let info = await Insert.save();

    res.send({
        status: "Success",
        message: "Successfully Inserted Data Class",
        info: info
    })
})


router.put('/:id', async (req, res) => {

    let { id } = req.params;

    let Edit = await ClassModel.findByIdAndUpdate(id, req.body, { new: true });

    res.send({
        status: "Success",
        message: "Successfully Update Data Class",
        info: Edit
    })
})
router.delete('/:id', async (req, res) => {

    let { id } = req.params;

    let Remove = await ClassModel.findByIdAndDelete(id);
    if (!Remove) {
        res.send()
        return
    }
    res.send({
        status: "Success",
        message: "Successfully Delete Data Class",
        info: Remove
    })
})

module.exports = router;