const { default: easyinvoice } = require('easyinvoice');
const express = require('express');
const path = require('path');
const fs = require('fs')
const router = express.Router();




// const ImagePath = path.resolve()

// const base64_encode = (ImagePath) => {
//     let png = fs.readFileSync(ImagePath)

//     return new Buffer.from(png).toString('base64')
// }

// let data = {
//     "Currency": "USD",
//     "taxNotation": "vat",
//     "marginTop": 25,
//     'marginRight': 25,
//     "marginLeft": 25,
//     "marginBottom": 25,
//     "logo": `${base64_encode(ImagePath)}`,
//     "sender": {
//         "company": "Sample",
//         "address": "Sample",
//         "zip": 23332,
//         "city": "Somalia",
//         "country": "Somalia"
//     },
//     "  client": {
//         "company": "Sample",
//         "address": "Sample",
//         "zip": 23332,
//         "city": "Somalia",
//         "country": "Somalia"
//     },
//     "invoiceNumber": "2020.001",
//     "invoiceData": "05-3-2023",
//     "products": [
//         {
//             " quantity": "2",
//             "description": "Tesst",
//             "tax": "4",
//             "price": "320"
//         }
//     ],

//     "bottomNotice": "Kindly pay your invioce within 15 days"
// }



// router.get('/', async (req, res) => {

//    try {
       
//     let Result = await easyinvoice.createInvoice(data)
//     fs.writeFileSync(`../invoice${Date.now()}.pdf`,
//         Result.pdf, 'base64')

//         res.send(Result)
    
//    } catch (error) {
//     res.send(error.message)
    
//    }
// })



module.exports = router;