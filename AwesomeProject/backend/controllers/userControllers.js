const User = require('../models/userModel')
const mongoose = require('mongoose')
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
// get all users
const getUsers = async (req, res) => {
    //console.log(req.query)
    const users = await User.find({});
    res.status(200).json(users);
}
//getUser by query
const getBySignin = async (req, res) => {
    // console.log(req.query)
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email, password: password });
        if (!user) {
            return res.status(404).json({ error: 'Email or password wrong' });
        }
        res.status(200).json(user);
    } catch {
        res.status(400).json({ error: error.message });
    }
}

// get a single user
const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }
    res.status(200).json(user)
}

// create a new user
const createUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body

    //add doc to db
    try {
        const user = await User.create({ firstname, lastname, email, password })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }
    const user = await User.findOneAndDelete({ _id: id })
    if (!user) {
        return res.status(400).json({ error: 'No such user' })
    }
    res.status(200).json(user)
}

// update user
const updateUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }
    const user = await User.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!user) {
        return res.status(400).json({ error: 'No such user' })
    }
    res.status(200).json(user)
}

/*const forgetPass = async (req, res) => {
    const { email } = req.body;
    //fimd user by email
    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ error: 'No such user please enter your email again' })
        }
        //generate code
        const randomString = randomstring.generate();
        const data = User.updateOne({ email: email }, { $set: { token: randomString } });

        res.status(200).json({ success: true, msg: 'Please check your email inbox and reset your password' });

    }
    catch (err) {
        console.log(err);
        res.status(400).send({ success: false, msg: error.message })
    }
}*/
/*const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: "gmail",
            port: 587,
            secure: false,
            requireTLS: true,
            auth{
            user: process.env.USER, //email to send from
            pass: process.env.PAAS, //password
        },
        });
    await mailtransporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        text: text
    },(err)=> {
        if(err){
            console.log("it has error")
        }
        else{
          console.log("email sent")
        }
    });
    console.log("email sent successfully")
}
    catch (error) {
    console.log(error, "email not sent")
}
}*/


module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    getBySignin,
   // forgetPass,
}