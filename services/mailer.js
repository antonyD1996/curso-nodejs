import nodemailer from "nodemailer";
import { newToken} from "./token.js";

export const sendVerificationMail = (user) => {
  const token = newToken(user._id);
  const link = `localhost:8080/auth/verify/?token=${token}`;
  sendHTMLEmail(
    user.email,
    "Verificacion de Email",
    `<p>Haz clik <a href="http://localhost:8080/auth/verify/?token=${token}">aqui</a> para confirmar tu correo</p>`
  );
};

const sendHTMLEmail = (toEmail, subject, html) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: 'perdav1996@gmail.com',
      pass: 'andaduper2096',
    },
  });


  const options = {
    from: "Antony Duarte <perdav1996@gmail.com>",
    to: toEmail,
    subject: subject,
    html: html,
  };

  transporter
    .sendMail(options)
    .then((res) => {
      console.log("Correo Enviado");
    })
    .catch((err) => {
      console.log(err);
    });
};

const sendTextEmail = (toEmail, subject, text) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });


  const options = {
    from: "Antony Duarte <perdav1996@gmail.com>",
    to: toEmail,
    subject: subject,
    text: text,
  };

  transporter
    .sendMail(options)
    .then((res) => {
      console.log("Correo Enviado");
    })
    .catch((err) => {
      console.log(err);
    });
};
