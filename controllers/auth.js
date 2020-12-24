import { User } from '../models/user.js'
import bcrypt, { hash } from 'bcrypt'

export const renderRegister = (req, res) => {
    res.render('registration.ejs', { path: "Registration" })
}

export const renderLogin = (req, res) => {
    res.render('login.ejs', { path: "Registration" })
}

const hashPassword = (password, res, callback) => {
    bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
            res.status(500).json(error)
        } else {
            callback(hash)
        }
    });
}

export const register = (req, res) => {
    const { fullname, email, password } = req.body
    const [firstName, lastName] = fullname.split(' ')
    hashPassword(password, res, (hash) => {
        const newUser = new User({ firstName, lastName, email, password: hash })
        newUser.save().then((user) => {
            return res.direct('/');
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: { message: "Invalid Email" } });
        })
    });
}



export const login = (req, res) => {
    const { email, password } = req.body

    if (email === "" || password === "") {
        return res.status(400)
    }
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, isValid) => {
                if (err) {
                    return res.status(500).json({ message: "err" })
                }
                if (isValid) {
                    res.redirect('/')
                } else {
                    res.status(400).json({ message: 'Los datos ingresados son invalidos' })
                }
            })
        }
    })
}

export default { renderRegister, renderLogin, register, login }