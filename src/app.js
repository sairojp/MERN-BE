const express = require("express");
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.json())
const PORT = 5000;
app.use(cors());

const mongoDbURI = "mongodb://127.0.0.1:27017/lec";
mongoose.connect(mongoDbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: {type : String,unique : true},
  fullname: String,
  title: String,
  skills: [{ type: String }],
  address: String,
  job_type: String,
  id: Number,
  is_active: Boolean,
  followers: [{ type: String }],
  followings: [{ type: String }],
});

const User = mongoose.model("user", userSchema);



const postSchema = new mongoose.Schema([
  {
    title: String,
    description: String,
    location: String,
    job_type: String,
    pay_rate_per_hr_dollar: Number,
    skills: [{ type: String }],
    liked_by: [{ type: String }],
    viewed_by: [{ type: String }],
    id: Number,
    user_id: Number,
    post_by_username: String,
    post_by_fullname: String,
    post_date: String,
    comments: [{ type: String }],
  },
]);




const Post = mongoose.model("post", postSchema);






app.get("/", (req, res) => {
  res.status(200).send("This is response from BE");
});

// read file and send content of file as response
app.get("/api/v1/posts", (req, res) => {
  const posts = fs.readFileSync("./data/post.json", "utf-8").toString();
  res.status(200).send(posts);
});


app.get("/api/v1/user", async (req, res) => {
  const user = await User.find({id:1});  // returns an array
  // const user = fs.readFileSync("./data/user.json", "utf-8").toString();
  res.status(200).send(user[0]);
});

app.post("/api/v1/user", async (req ,resp )=> {
  const lastUser = await User.findOne({},null ,{sort : {id : -1}}) ;
  
  const {username, email, fullname, title, job_type,skills, address, password} = req.body;

  // checks if same username already exists
  const usernameUser = await User.findOne({ username});
  if(usernameUser){
    return resp.status(404).send({error : "Username already taken"});
  }


  let id = 1;
  if (lastUser) {
    id = lastUser.id + 1;
  } 
  const newUser ={
    email,
    username,
    fullname,
    title,
    skills,
    address,
    job_type,
    id,
    is_active:true,
    followers: [],
    followings: [],
    password,
  }
  User.create(newUser).then((createdUser) => {
    console.log("User created");
    resp.status(200).send(createdUser);
  })
  .catch((err)=>{
    console.error(err);
    resp.status(500).send({error : "Can not process your request"})
  });
});


// login api
app.post("/api/v1/login", async (req ,resp )=> {

  // checks if same username already exists
  const user= await User.findOne({ 
    username:req.body.username,
    password:req.body.password,
    is_active: true,});
    
  if(user){
    resp.status(200).send({ message: "Login successfull" });
  }else{
    resp.status(404).send({ error: "Invalid username or password" });
  }
});

app.listen(PORT, () => {
  console.log("App is running on " + PORT);
});
