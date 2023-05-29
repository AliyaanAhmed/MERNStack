const nodemailer = require("nodemailer");


const sendMail = async (options) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'anasimran7861@gmail.com',
            pass: 'dlkeshjyaawxdipu'
        }
    });

    const mailOptions = {
        from: "anasimran7861@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
}
module.exports = sendMail;