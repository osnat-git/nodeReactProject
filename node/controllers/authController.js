const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { userName, password } = req.body
    console.log(password);
    console.log(userName);
    if (!userName || !password)
        return res.status(400).send("שם משתמש וסיסמא הם חובה")
    const foundUser = await User.findOne({ userName: userName }).lean()
    if(!foundUser)
        return res.status(401).send("לא מורשה")
    const match = await bcrypt.compare(password, foundUser.password)
    if ( !match)
        return res.status(401).send("לא מורשה")
    const userObject={
        _id:foundUser._id,
        userName,
        name:foundUser.name,
        phone:foundUser.phone,
        email:foundUser.email,
        role:foundUser.role
    }
    const token=jwt.sign(userObject,process.env.TOKEN_PSWD)
    res.json(token)
}

const register = async (req, res) => {
    const { userName, password, name, email, phone } = req.body
    if (!userName || !password)
        return res.status(400).send("שם משתמש וסיסמא הם חובה")
    if(Number(password.length)<6)
        return res.status(400).send("הסיסמא חייבת להכיל לפחות 6 תווים")
    if (!phone && !email)
        return res.status(400).send("חובה לציין לפחות טלפון או מייל")
    const sameUserName = await User.findOne({ userName: userName }).lean()
    if (sameUserName)
        return res.status(409).send("שם משתמש כבר קיים")

    const hashedPswd = await bcrypt.hash(password, 10)
    const user = await User.create({ userName, password: hashedPswd, name, phone, email })
    if (!user)
        return res.status(401).send("נכשל")
    res.json(`המשתמש ${user.userName} נרשם בהצלחה`)
}

module.exports = { login, register }