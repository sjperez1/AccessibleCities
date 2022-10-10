const UserController = require("../controllers/user.controller")
const PostController = require("../controllers/post.controller")
const {authenticate} = require("../configs/jwt.config")
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage: storage})


module.exports = (app) => {
    // user routes
    app.post("/api/user/register", UserController.registerUser)
    app.post("/api/user/login", UserController.loginUser)
    app.get("/api/user/logout", UserController.logoutUser)
    app.get("/api/user/loggedinuser", authenticate, UserController.getLoggedIn)
    // post routes
    app.get("/api/posts", PostController.allPosts)
    app.get("/api/post/user", PostController.oneUserPost)
    app.get("/api/post/:id", PostController.onePost)
    app.delete("/api/post/:id", PostController.deletePost)
    app.post("/api/post", PostController.addPost)
    // picture routes
    app.post("/api/picture", upload.single('picture'), PostController.addPicture) // upload.single() is the middleware function to upload a single image. The string value has to match the string used when appending the data to pictureData in CreatePostForm.jsx
}