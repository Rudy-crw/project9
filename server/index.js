const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

//連結MongoDB
mongoose
  .connect("mongodb://127.0.0.1/mernDB")
  .then(() => {
    console.log("連結到mongodb....");
  })
  .catch((e) => {
    console.log(e);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);
//course route應該被jwt保護
//如果request header內部沒有jwt，則request就會被視為unauthorized
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);
//只有登入系統的人(手上有JWT)，才能新增課程或註冊課程

//因為port3000是React預設的
app.listen(8080, () => {
  console.log("後端伺服器聆聽在port 8080...");
});
