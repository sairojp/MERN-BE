const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  username: { type: String, unique: true },
  password: String,
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

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  job_type: String,
  pay_rate_per_hr_dollar: Number,
  skills: [{ type: String }],
  liked_by: [{ type: String }],
  viewed_by: [{ type: String }],
  id: { type: Number, unique: true },
  user_id: Number,
  post_by_username: String,
  post_by_fullname: String,
  post_date: { type: Date, default: new Date() },
  comments: [{ type: Object }],
});

module.exports = {
  userSchema,
  postSchema,
};
