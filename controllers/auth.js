import  User  from "../models/user.js";
import { newAuthToken, verify } from "../services/token.js";
import {sendVerificationMail} from "../services/mailer.js";

export const refreshToken = (req, res) => {
  return res.json({});
};

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userToSave = new User(firstName, lastName, email, password);
  try {
    const savedUser = await userToSave.save();
    sendVerificationMail(savedUser);
    return res.send({ user: savedUser, token: newAuthToken(savedUser.userId) });
  } catch (err) {
    return res
      .status(500)
      .send({ status: "error", message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    return res.status(400);
  }

  try {
    const { valid, found, user } = await User.findByEmailAndComparePassword(
      email,
      password
    );

    if (!valid)
      return res
        .status(400)
        .send({ status: "error", message: "Invalid Credentials" });

    if (!found)
      return res
        .status(404)
        .send({ status: "error", message: "User not found" });

    return res.send({ user: user, token: newAuthToken(user.userId) });
  } catch (err) {
    return res
      .status(500)
      .send({ status: "error", message: "Something went wrong" });
  }
};
export const verifyEmail = (req, res) => {
  const token = req.query.token;
  const valor = verify(token);
  console.log(valor);

  if (valor.valid === true) {
    User.findByIdAndUpdate(
      valor.key,
      { emailVerified: true },
      (err, adventure) => {
        console.log(adventure);
        res.end();
      }
    );
  }
};

export default { register, login, verifyEmail };
