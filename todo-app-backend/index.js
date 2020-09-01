require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

// IMPORT ROUTES
const todoRoutes = require("./routes/todo");

// DATABASE CONNECTION
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connected");
  });

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// ROUTES
app.use("/api/todo-app/", todoRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
