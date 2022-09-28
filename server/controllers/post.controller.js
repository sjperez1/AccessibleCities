const {User} = require("./../models/user.model")
const {Post} = require('./../models/post.model')
const jwt = require("jsonwebtoken")

module.exports.allPosts = async (req, res) => {
    try {
        const postsPerPage = 6
        // whatever is after req.query will be the word in the URL that comes after the ? mark and before the equal sign. The query part is what makes the URL get setup this way. The following says go to the page number that is requested or 
        const page = parseInt(req.query.page || 0)
        const total = await Post.countDocuments({})
        const posts = await Post.find({})
            .limit(postsPerPage)
            .skip(postsPerPage * page)
            res.json({
                totalPages: Math.ceil(total / postsPerPage),
                posts
            })
    } catch(err) {
        console.log(err)
    }
}

module.exports.addPost = async(req, res) => {
    try {
        //adding the comment into the model
        const newPost = Post(req.body)
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true})
        const userId = decodedJWT.payload.id
        newPost.user = userId
        await newPost.save()

        // this will push the new post into User model
        const updatedUser = await User.findOneAndUpdate(
            {_id : userId},
            {$push : {posts : newPost}},
            {new : true}
        )
        res.json(updatedUser)
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}

module.exports.oneUserPost = async(req, res) => {
    try {
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true})
        const userId = decodedJWT.payload.id
        const postsPerPage = 6
        // whatever is after req.query will be the word in the URL that comes after the ? mark and before the equal sign. The query part is what makes the URL get setup this way. The following says go to the page number that is requested or 
        const userposts = await Post.find({user: userId})
        const page = parseInt(req.query.page || 0)
        const total = await Post.countDocuments({})
            .limit(postsPerPage)
            .skip(postsPerPage * page)
            res.json({
                totalPages: Math.ceil(total / postsPerPage),
                userposts
            })
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}
// the following is another way to write oneUserPost to get all posts of the logged in user without pagination
// module.exports.oneUserPost = (req, res) => {
    // const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true})
    // const userId = decodedJWT.payload.id
    // Post.find({user: userId})
    //     .then(posts=> res.json(posts))
    //     .catch(err=> res.status(400).json(err))
// }

// the following is another way to write oneUserPost to get all posts of the logged in user without pagination
// module.exports.oneUser = (req, res) => {
//     console.log("in one user")
//     const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true})
//     const userId = decodedJWT.payload.id
//     console.log(userId)
//     User.findOne({_id: userId}).populate("posts")
//         .then(user=> res.json(user.posts))
//         .catch(err=>res.status(400).json(err))
// }

module.exports.onePost = (req, res)=>{
    // id is obtained by params (params are from URL)
    const idFromParams = req.params.id
    // give criteria to get id from params to make _id
    Post.findOne({_id: idFromParams})
        .then(onePost => res.json(onePost))
        .catch(err=> res.json(err))
}

module.exports.deletePost = (req, res)=>{
    Post.deleteOne({_id: req.params.id})
        // cannot put res to the left of the arrow because res.json will look at that local res instead.
        .then(deletePost=>res.json(deletePost))
        .catch(err=>res.json(err))
}