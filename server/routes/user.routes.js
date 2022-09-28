const UserController = require("../controllers/user.controller")
const PostController = require("../controllers/post.controller")
const {authenticate} = require("../configs/jwt.config")

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
}