const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport(
  {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_BOX,
      pass: process.env.MAIL_PASS,
    },
  },
  {
    from: "Quantum System <process.env.MAIL_BOX>",
  }
);

let mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
  });
};

module.exports = mailer;
