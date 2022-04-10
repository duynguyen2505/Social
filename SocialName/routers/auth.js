const router = require("express").Router();
const User = require("../models/User")
const brcypt = require("bcrypt")
    // REGISTER
router.post("/register", async(req, res) => {
    try {
        //generate new password
        const salt = await brcypt.genSalt(10);
        const hashedPassword = await brcypt.hash(req.body.password, salt.toString())

        //create new User
        const newuser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })

        // save user and repsond
        const user = newuser.save();
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }


});

//LOGIN

router.post("/login", async(req, res) => {

    try {

        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found")

        const validPassword = await brcypt.compare(req.body.password, user.password)

        !validPassword && res.status(404).json("wrong password")
        console.log(user)

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router