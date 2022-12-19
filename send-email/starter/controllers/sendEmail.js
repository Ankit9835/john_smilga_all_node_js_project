const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail')

const sendEmailEthernal = async (req,res) => {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'quinn.johnson@ethereal.email',
          pass: '5VUSD7jeuTPBmKbahn'
        }
    });

    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
    res.json({info})
}

const sendEmail = async (req,res) => {
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'ankit40611@gmail.com', // Change to your recipient
  from: 'ankitsinha874@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
const info = await sgMail.send(msg)
res.json(info)
}

module.exports = sendEmail