const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const { checkAdmin, requireAdmin } = require("./middleware/adminMiddleware");

const adminRoutes = require("./routes/adminRoutes");
const contentRoutes = require("./routes/contentRoutes");

const mongoose = require("mongoose");
const dbURI =  "mongodb+srv://harshit:1606@cluster0.oiqki.mongodb.net/?retryWrites=true&w=majority";


mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("*", checkUser);

app.get("*", checkAdmin);

app.use("/admin", requireAdmin, adminRoutes);

app.get("/", (req, res) => res.redirect("/home"));

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/home", (req, res) => {
  res.render("home", { title: "Home" });
});

app.use(contentRoutes);

app.use(authRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Create Blog" });
});
