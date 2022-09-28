const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstName : {
        type : String,
        required : [true, "First name is required"],
        minlength : [2, "First name must be at least 2 characters"]
    },
    lastName : {
        type : String,
        required : [true, "Last name is required"],
        minlength : [2, "Last name must be at least 2 characters"]
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Enter a valid email"
        }
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        minlength : [8, "Password must be at least 8 characters"]
    },
    posts : [{
        type : Schema.Types.ObjectId,
        ref : 'Post'
    }]
}, {timestamps : true})


UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

// the save will make it run the function
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            console.log(err)
        })
});

UserSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

// this schema export must go at the bottom
module.exports.User = mongoose.model('User', UserSchema)