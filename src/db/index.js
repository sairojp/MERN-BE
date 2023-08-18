const mongoose = require("mongoose");
const { postSchema, userSchema } = require("./schema");

const mongoDbURI = "mongodb://localhost:27017/lec"; // db connection string

const connectDB = () => {
  mongoose.connect(mongoDbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const User = mongoose.model("user", userSchema);
const Post = mongoose.model("post", postSchema);

module.exports = {
  connectDB,
  User,
  Post
};
