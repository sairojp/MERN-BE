const {
  addPost,
  getPosts,
  likePost,
  viewPost,
  addCommentInPost,
  deleteCommentFromPost,
} = require("../controllers/post");
const {
  getUser,
  getSuggestions,
  loginUser,
  signUpUser,
} = require("../controllers/user");

// root path
app.get("/", (req, res) => {
  res.status(200).send({ status: "OK", message: "App is running" });
});



/*************** USER APIs begins ********************/

app.get("/api/v1/user/:id", getUser);

// suggestions api
app.get("/api/v1/user/:id/suggestions", getSuggestions);

// login api
app.post("/api/v1/login", loginUser);

app.post("/api/v1/user", signUpUser);
/*************** USER APIs ends ********************/



/*************** POST APIs begins ********************/

// read file and send content of file as response
app.get("/api/v1/posts", getPosts);

// create new record in db
app.post("/api/v1/post", addPost);

// like post
app.post("/api/v1/post/:id/like", likePost);

// view post
app.post("/api/v1/post/:id/view", viewPost);

// add post's comment
app.post("/api/v1/post/:id/comment", addCommentInPost);

// add post's comment
app.delete("/api/v1/post/:id/comment/:cid", deleteCommentFromPost);
/*************** POST APIs ends ********************/
