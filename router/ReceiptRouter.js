const express = require('express')

const { ReceiptModel, ReceiptValidation } = require('../Models/ReceiptModel');
const { StudentModel } = require('../Models/StudentModel');
const { UserModel } = require('../Models/UserModel');
const { ClassModel } = require('../Models/ClassModel');


const router = express.Router()

router.get('/', async (req, res) => {

    let GetStudent = await ReceiptModel.find()
    res.send(GetStudent)
})
router.get('/:id', async (req, res) => {

    let { id } = req.params;
    let GetStudent = await ReceiptModel.findById(id)
    res.send(GetStudent)
})

router.post('/', async (req, res) => {

    try {
        let { error } = ReceiptValidation(req.body)
        if (error) return res.send(error.message)


        let Insert = new ReceiptModel(req.body)

        let StudentData = await StudentModel.findOne({ _id: req.body.StudentID });

       


   

        const TotalAmountPaid = StudentData.AmountPaid + parseInt(req.body.ReceiptAmount)


        const CurrencyBalance = StudentData.TotalAmount - TotalAmountPaid
       


        if (StudentData.Balance < 1) {
            res.send(`Lacag malaga rabo  ${StudentData.Balance}`)

            return
        }


        if (TotalAmountPaid > StudentData.TotalAmount) {
            res.send(`Lacagta laga rabo waa ${StudentData.Balance}`)
            return
        }


        let CurrencyStatus = ''

        if (CurrencyBalance == "0") {
            CurrencyStatus = "FullPaid"

        }


        if (TotalAmountPaid < StudentData.TotalAmount) {
            CurrencyStatus = "PercialPaid"

        }







        let s =await StudentModel.findByIdAndUpdate(req.body.StudentID,{


            Balance: CurrencyBalance,
            Status: CurrencyStatus,
            AmountPaid: TotalAmountPaid


        }, { new: true })


       


        let info=await Insert.save()


        res.send({
            status: "Success",
            message: "Successfully Inserted Data Student",
            info: info
        })

    } catch (error) {

        res.send(error.message)

    }
})

router.put('/:id', async (req, res) => {

    
    let StudentData = await StudentModel.findOne({_id:req.params.id});

    
    const TotalAmountPaid = StudentData.AmountPaid + parseInt(req.body.ReceiptAmount)
    
    
    const CurrencyBalance = StudentData.TotalAmount + TotalAmountPaid
    
   
    let Update = await StudentModel.findByIdAndUpdate(req.params.id, {

        Balance: CurrencyBalance,
        AmountPaid: TotalAmountPaid


    } ,{ new: true })
    res.send({
        status: "Success",
        message: "Successfully Update Data Student",
        info: Update
    })
})
router.delete('/:id', async (req, res) => {

    let { id } = req.params;

    let Update = await ReceiptModel.findByIdAndDelete(id)
    if(!Update) return res.send()
    res.send({
        status: "Success",
        message: "Successfully Delete Data Student",
        info: Update
    })
})



module.exports = router;