require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

// IMPORT ROUTES
const todoRoutes = require("./routes/todo");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// DATABASE CONNECTION
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("error in db connection");
    console.log(err);
  });

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cookieParser());

let corsOptions = {
  origin: "https://thetodolistapp.herokuapp.com",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors());

// ROUTES
app.use("/api/todo-app", todoRoutes);
app.use("/api/todo-app", authRoutes);
app.use("/api/todo-app", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
