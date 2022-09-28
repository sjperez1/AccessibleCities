const {User} = require("./../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.registerUser = (req, res) => {
    User.find({email: req.body.email})
        .then(userWithThisEmail => {
            if(userWithThisEmail.length === 0){
                const newUser = req.body
                User.create(newUser)
                    .then(user => {
                        const userToken = jwt.sign({id: user._id}, process.env.SECRET_KEY);
                        res
                            .cookie("usertoken", userToken, process.env.SECRET_KEY, {httpOnly: true})
                            .json({msg: "success", user:user});
                    })
                    .catch(err => res.status(400).json(err))
            }else{
                res.status(400).json({errors: {email:{message:"This email is already taken."}}})
            }
        })
        .catch(err => res.status(400).json(err))
}

module.exports.loginUser = async(req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(req.body.email === ""){
        return res.json({error: "Enter the user email."})
    }
    if(req.body.password === ""){
        return res.json({error: "Enter a password."})
    }
    if(user === null) {
        // email not found in users collection
        return res.json({error: "User not found."})
    }
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if(!correctPassword) {
        // password wasn't a match!
        return res.json({error: "Password is incorrect."})
    }
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id,
        firstName: user.firstName
    }, process.env.SECRET_KEY);
    // note that the response object allows chained calls to cookie and json
    res.cookie("usertoken", userToken, process.env.SECRET_KEY, {httpOnly: true})
    .json({ msg: "success!" });
}

module.exports.logoutUser = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.getLoggedIn = (req,res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true})
    User.findOne({_id: decodedJWT.payload.id})
        .then(loggedUser => {
            res.json({results: loggedUser})
        })
        .catch(err => res.json(err))
}