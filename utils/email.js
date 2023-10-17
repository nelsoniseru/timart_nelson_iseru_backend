const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');


const auth = {
  auth: {
    api_key: process.env.API_KEY,
    domain: process.env.DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailgunTransport(auth));

 const SendMail=async(mailData)=>{
  let info = await transporter.sendMail(mailData)
  console.log(info)
  return info
}

module.exports = {SendMail}
