const router = require('express').Router();

const CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
const User = require('../models/User')
const verify = require('../verifyToken')


//Update

router.put('/:id', verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password)
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })

            res.status(200).json(updateUser)
        } catch (err) {

        }
    } else {
        res.status(403).json('You can update only your account')
    }
})
//Delete
//Get
//GET ALL
//GET USER STAts



module.exports = router;