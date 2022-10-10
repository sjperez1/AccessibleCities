const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    createdBy : {
        type : String,
        required : [true, "Created By must be stored"]
    },
    created : {
        type : String,
        required : [true, "Created at must be stored"]
    },
    location : {
        type : String,
        required : [true, "Location is required"],
        minlength : [3, "Location must be at least 3 characters"]
    },
    features : {
        type : String,
        required : [true, "Accessibility features are required"],
        minlength : [3, "Accessibility features must be at least 3 characters"],
        maxlength : [50, "Accessibility features must be less than 50 characters"]
    },
    preview : {
        type : String,
        required : [true, "You must provide a short preview description for your post"],
        minlength : [3, "The preview description must be at least 3 characters"],
        maxlength : [75, "The preview description must be less than 75 characters"]
    },
    postBody : {
        type : String,
        required : [true, "You must include a written post"],
        minlength : [20, "Posts must be at least 20 characters"]
    },
    // imgName : {
    //     type : String,
    //     required : [true, "You must include an image"]
    // },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true})

module.exports.Post = mongoose.model('Post', PostSchema)