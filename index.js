const express = require("express");
const app = express();
require("./config");
const users = require("./users");
var cookiesParser = require("cookie-parser");

const posts = require("./posts");
var uniqid = require("uniqid");
//middileware
app.use(express.json());
app.use(cookiesParser());
//route
app.post("/signup", async (req, res) => {
  console.log(req.body);
  let data = new users(req.body);
  const result = await data.save();
  res.send(result);
});

app.post("/signin", require("./auth").authLogin, async (req, res) => {
  const { userId, password } = req.body;
  const user_info = await users.findOne({ userId });

  if (!user_info || user_info.password !== password) {
    res.status(401).json({ error: "invalid userid or password" });
  } else {
    const tokenGen = require("./jwtGenerator");
    const token = tokenGen.gentoken({ userId, password });
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Login successful" });
  }
});

app.post("/create_post", require("./auth").authAction, async (req, res) => {
  try {
    let postId = uniqid();
    let userId = req.userId;
    let postTitle = req.body.postTitle;
    let postBody = req.body.postBody;
    let newPost = await posts.create({ userId, postId, postTitle, postBody });
    res.json({ newPost });
  } catch {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/", (req, res) => {
  console.log("helloooo");
  res.send("Heloooooo");
});

app.listen(5000, () => {
  console.log("Server is running");
});
