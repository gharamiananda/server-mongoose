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

router.delete('/:id', verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {

        try {
            await User.findByIdAndDelete(req.params.id)

            res.status(200).json("Succesfully deleted the user...")
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can delete only your account')
    }
})
//Get





router.get('/:id', verify, async (req, res) => {


    try {
        const user = await User.findById(req.params.id)

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)

    }

})


//GET ALL



router.get('/', verify, async (req, res) => {

    const query = req.params.new;
    if (req.user?.isAdmin) {
        try {
            const userAll = query ? await User.find().limit(2) : await User.find()

            res.status(200).json(userAll)
        } catch (err) {
            res.status(500).json(err)

        }
    }
})
//GET USER STAts



module.exports = router;