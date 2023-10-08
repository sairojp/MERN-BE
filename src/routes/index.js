const {Router} = require("express");
const {
  addPost,
  getPosts,
  likePost,
  viewPost,
  addCommentInPost,
  deleteCommentFromPost,
} = require("../controllers/post");

const router = Router();

const {
  getUser,
  getSuggestions,
  loginUser,
  signUpUser,
} = require("../controllers/user");

// root path
router.get("/", (req, res) => {
  res.status(200).send({ status: "OK", message: "App is running" });
});



/*************** USER APIs begins ********************/

router.get("/api/v1/user/:id", getUser);

// suggestions api
router.get("/api/v1/user/:id/suggestions", getSuggestions);

// login api
router.post("/api/v1/login", loginUser);

router.post("/api/v1/user", signUpUser);
/*************** USER APIs ends ********************/



/*************** POST APIs begins ********************/

// read file and send content of file as response
router.get("/api/v1/posts", getPosts);

// create new record in db
router.post("/api/v1/post", addPost);

// like post
router.post("/api/v1/post/:id/like", likePost);

// view post
router.post("/api/v1/post/:id/view", viewPost);

// add post's comment
router.post("/api/v1/post/:id/comment", addCommentInPost);

// add post's comment
router.delete("/api/v1/post/:id/comment/:cid", deleteCommentFromPost);
/*************** POST APIs ends ********************/
module.exports = {
  router,
};