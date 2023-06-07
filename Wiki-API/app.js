const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/wikiDB");
    console.log(`Connected to database: ${process.pid}`);
  } catch (err) {
    console.log(`Connection error: ${err.stack} on Process: ${process.pid}`);
    process.exit(1);
  }
};
connectDB();

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

app
  .route("/articles")

  .get(async (req, res) => {
    const foundArticles = await Article.find({});
    if (foundArticles ? res.send(foundArticles) : res.send("err"));
  })

  .post(async (req, res) => {
    const body = req.body;
    const newArticle = await Article.create({
      title: body.title,
      content: body.content,
    });
    if (!newArticle ? res.send("Successfully Added Data") : res.send("err"));
  })

  .delete(async (req, res) => {
    const del = await Article.deleteMany();
    if (del ? res.send("Success deleted all items") : res.send("Error"));
  });

//Specific Articles
app
  .route("/articles/:articleTitle")
  .get(async (req, res) => {
    const title = req.params.articleTitle;
    try {
      const foundArticle = await Article.findOne({ title: title });
      if (foundArticle ? res.send(foundArticle) : res.send("No article found"));
    } catch (err) {
      res.send(err);
    }
  })

  .put(async (req, res) => {
    try {
      const updatedArticles = await Article.update(
        {
          title: req.params.articleTitle,
        },
        {
          title: req.body.title,
          content: req.body.content,
        },
        { overwrite: true }
      );
      res.send("Succesfully Updated");
    } catch (err) {
      res.send(err);
    }
  })
  .patch();

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
