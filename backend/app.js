const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/inventory");

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const itemsRouter = require("./routes/items");
const authRouter = require("./routes/auth");

app.use("/items", itemsRouter);
app.use("/auth", authRouter);

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "signup.html"));
});

app.listen(3001, function () {
  console.log(`Server is running at http://localhost:3001`);
});
