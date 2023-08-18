const { Post } = require("../db");

const getPosts = async (req, res) => {
  console.log("read posts");
  const posts = await Post.find({}, null, { sort: { post_date: -1 } });
  res.status(200).send(posts);
};

const addPost = async (req, res) => {
  console.log("create post");
  const lastPost = await Post.findOne({}, null, { sort: { id: -1 } });

  const {
    title,
    description,
    location,
    job_type,
    pay_rate_per_hr_dollar,
    skills,
    user_id,
    post_by_username,
    post_by_fullname,
  } = req.body;

  let id = 1;
  if (lastPost) {
    id = lastPost.id + 1;
  }
  const newPost = {
    title,
    description,
    location,
    job_type,
    pay_rate_per_hr_dollar,
    skills,
    liked_by: [],
    viewed_by: [],
    id,
    user_id,
    post_by_username,
    post_by_fullname,
    post_date: new Date(),
    comments: [],
  };
  Post.create(newPost)
    .then((createdPost) => {
      console.log("Post created");
      res.status(200).send(createdPost);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: "Can not process your request" });
    });
};

const likePost = async (req, res) => {
  const id = req.params.id;

  const { username } = req.body;

  const post = await Post.findOne({ id });

  if (post) {
    const liked_by = [...post.liked_by];
    if (liked_by.includes(username)) {
      // removes username from array
      const indexOfUsername = liked_by.indexOf(username);
      liked_by.splice(indexOfUsername, 1);
    } else {
      liked_by.push(username);
    }
    post.liked_by = liked_by;
    post
      .save()
      .then(() => {
        console.log("Like updated");
        res.status(200).send(post.liked_by);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ error: "Can not process your request" });
      });
  } else {
    res.status(404).send({ error: "Post could not be found" });
  }
};

const viewPost = async (req, res) => {
  const id = req.params.id;

  const { username } = req.body;

  const post = await Post.findOne({ id });

  if (post) {
    const viewed_by = [...post.viewed_by];
    if (!viewed_by.includes(username)) {
      viewed_by.push(username);
    }
    post.viewed_by = viewed_by;
    post
      .save()
      .then(() => {
        console.log("View updated");
        res.status(200).send(post.viewed_by);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ error: "Can not process your request" });
      });
  } else {
    res.status(500).send({ error: "Post could not be found" });
  }
};

const addCommentInPost = async (req, res) => {
  const id = req.params.id; // post id

  const { comment } = req.body;

  const post = await Post.findOne({ id });

  if (post) {
    const currentComments = post.comments;
    let commentId = 1;
    if (currentComments.length) {
      const sortedComments = currentComments.sort((a, b) => a.id - b.id);
      commentId = sortedComments[0].id + 1;
    }
    comment.id = commentId;

    Post.findOneAndUpdate(
      { id },
      { $push: { comments: comment } },
      { returnOriginal: false }
    )
      .then((updatedPost) => {
        console.log("Comment added");
        res.status(200).send(updatedPost.comments);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ error: "Can not process your request" });
      });
  } else {
    res.status(500).send({ error: "Can not process your request" });
  }
};

const deleteCommentFromPost = async (req, res) => {
  const id = req.params.id; // post id
  const cid = req.params.cid; // comment id

  const post = await Post.findOne({ id });

  if (post) {
    const currentComments = post.comments;
    const newComments = currentComments.filter((c) => c.id !== parseInt(cid));

    Post.findOneAndUpdate(
      { id },
      { $set: { comments: newComments } },
      { returnOriginal: false }
    )
      .then((updatedPost) => {
        console.log("Comment added");
        res.status(200).send(updatedPost.comments);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ error: "Can not process your request" });
      });
  } else {
    res.status(500).send({ error: "Can not process your request" });
  }
};

module.exports = {
  getPosts,
  addPost,
  likePost,
  viewPost,
  addCommentInPost,
  deleteCommentFromPost,
};
