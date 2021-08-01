const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

//* express app
const app = express();

//* MongoDB connection
const dbURI =
  "mongodb+srv://Prakhar:test123@nodeblog.5dsmy.mongodb.net/NodeBlog?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT :- ${PORT}`);
    }); //? Listening to Requests when Database is connected.
    print("Connected to DB");
  })
  .catch((err) => print(err)); //! If any error occured

const PORT = process.env.PORT || 3000;

const print = (...args) => console.log(...args);

//* middleware for static files
app.use(express.static("public"));

//* middleware for url encoded data coming from forms
app.use(express.urlencoded({ extended: true }));

//* A simple middleware
/*
?  app.use((req, res, next) => {
?  print("New Request is made.");
?  print("Host: ", req.hostname);
?  print("Path: ", req.path);
?  print("Method: ", req.method);
?  next();
? });

*/

//* Third-party middleware
app.use(morgan("dev"));

//* setting view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //TODO: res.sendFile("./views/index.html", { root: __dirname });
  res.redirect("/blogs"); //? redirect to /blogs routes.
});

app.get("/about", (req, res) => {
  //TODO: res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

//* Blog Routes
app.use(blogRoutes);

//* 404 Error Page using middleware
app.use((req, res) => {
  //TODO: res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "Not Found" });
});
