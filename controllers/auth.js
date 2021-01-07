import { User } from "../models/user.js";
import bcrypt, { hash } from "bcrypt";
import { sendVerificationMail } from "../services/mailer.js";
import expressSession from "express-session";
import { verify } from "../services/token.js";

export const renderRegister = (req, res) => {
  res.render("registration.ejs", { path: "Registration" });
};

export const renderLogin = (req, res) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.render("login.ejs", { path: "Registration" });
};

const hashPassword = (password, res, callback) => {
  bcrypt.hash(password, 10, (error, hash) => {
    if (error) {
      res.status(500).json(error);
    } else {
      callback(hash);
    }
  });
};

export const register = (req, res) => {
  const { fullname, email, password } = req.body;
  const [firstName, lastName] = fullname.split(" ");

  hashPassword(password, res, (hash) => {
    const newUser = new User({ firstName, lastName, email, password: hash });
    newUser
      .save()
      .then((user) => {
        req.session.userId = user._id;
        req.session.save((err) => {
          console.log(err);
        });
        sendVerificationMail(user);
        return res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: { message: "Invalid Email" } });
      });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    return res.status(400);
  }

  User.findByEmailAndComparePassword(email, password)
    .then(({ isValid, user }) => {
      if (isValid) {
        res.redirect("/");
      }
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: "Los datos ingresados son invalidos" });
    });
};
export const verifyEmail = (req, res) => {
  const token = req.query.token;
  const valor = verify(token);
  console.log(valor)

  if(valor.valid===true){

    User.findByIdAndUpdate(valor.key, { emailVerified: true }, (err, adventure)=> {
        console.log(adventure)
        res.end()
    });
  }
 
};

export default { renderRegister, renderLogin, register, login, verifyEmail };
