const express = require('express')

const router = express.Router()

const nodemailer = require('nodemailer')



const html = `
<h1>Hello World </h1>

<p>Isn't Nodemailer useful ?</p>

`;


// async function main(){

//    const transporter= nodemailer.createTransport({
//         host:'mail.openjavascript.info',
//         port:465,
//         secure:true,
//         auth:{
//             User:'test@openjavascript.info',
//             pass:"NodeMailer123!"
//         }
//     })

//   const info=  await transporter.sendMail({
// from:"OpenJavascript <test@openjavascript.info>",
// to:"test2@openjavascript.info",
// subject:"Testing ,Testing 123",
// html:html

//     })

//     console.log('Message Sent '+info.messageId)


// }
// main();


router.post('/createEmail', async (req, res) => {

    try {
        let testAccount = await nodemailer.createTestAccount()



        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                User: testAccount.user,
                pass: testAccount.pass
            }
        })


        let message = {

            from: "OpenJavascript <test@openjavascript.info>",
            to: "test2@openjavascript.info",
            subject: "Testing ,Testing 123",
            html: html

        }


        transporter.sendMail(message).then((info) => {
            return res.send({ message: 'you should Receive an email', info: info.messageId, preview: nodemailer.getTestMessageUrl(info) })
        })
    
  } catch (error) {

    res.send(error.message)
}
})




module.exports = router;