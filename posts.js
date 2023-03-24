const mongoose = require("mongoose");
const postsSchema = {
  userId: String,
  postId: String,
  postTitle: String,
  postBody: String,
};

module.exports = mongoose.model("posts", postsSchema);
