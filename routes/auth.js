const router = require('express').Router();
const CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
const User = require('../models/User')

// Register 
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),

        // var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
    })

    try {
        const user = await newUser.save();

        res.status(200).json(user)
    } catch (error) {
        console.log(error)

        res.status(500).json(error)
    }
})



router.post('/login', async (req, res) => {


    try {

        const user = await User.findOne({ email: req.body.email })
        !user && res.status(401).json("Wrong PAssword")

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        originalText !== req.body.password && res.status(401).json("Wrong PAssword")
        if (originalText == req.body.password) {
            const { password, ...info } = user._doc;
            const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
                process.env.SECRET_KEY, { expiresIn: "5d" })
            res.status(200).json({ ...info, accessToken })
        }
    } catch (error) {
        console.log(error)

        res.status(500).json(error)
    }
})
module.exports = router