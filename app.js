require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mailer = require("./nodemailer");

const app = express();

const port = process.env.PORT || 9000;

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use("/bundles", express.static(__dirname + "/bundles"));
app.use("/Content", express.static(__dirname + "/Content"));

app.get("/", urlencodedParser, function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.post("/index", urlencodedParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);
  let message = {
    to: process.env.MAIL_TO,
    subject: "Form 1",
    text: `${request.body.firstname}
${request.body.email}`,
  };
  mailer(message);
  response.sendFile(__dirname + "/registration.html");
});
app.post("/registration", urlencodedParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);
  let message = {
    to: process.env.MAIL_TO,
    subject: "Form 2",
    text: `${request.body.firstname}
${request.body.lastname}
${request.body.email}
${request.body.phone_number}`,
  };
  mailer(message);
  response.sendFile(__dirname + "/thanks.html");
});

app.listen(port);
