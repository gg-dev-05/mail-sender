require('dotenv').config();
// console.log(require('dotenv').config({ debug: true }))

const express = require('express')
const sgMail = require('@sendgrid/mail')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json());


app.route('/').get((req, res) => {
    res.send("HELLO WORLD")
})

app.route('/send').post((req, res) => {

    console.log(req.body)
    req.body.message += "\nFrom: " + req.body.name + " | " + req.body.from
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: process.env.me,
        from: process.env.bot, // Change to your verified sender
        subject: req.body.subject,
        text: req.body.message,
    }
    sgMail
        .send(msg)
        .then(() => {
            res.send('Email sent')
        })
        .catch((error) => {
            res.send(error)
        })

})


app.listen(5000, () => console.log('Server running on port 5000'))
