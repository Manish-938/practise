const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { firebaseConfig } = require("./firebaseConfig");
// const { sendMail } = require("./controllers/nodemailer");
const { addCountry, countryList } = require("./controllers/country");
const { addCity, cityList } = require("./controllers/city");

const app = express();
app.use(cors());
app.use(express.json());

const firebaseapp = initializeApp(firebaseConfig);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/addCountry", addCountry);
app.post("/countryList", countryList);
app.post("/addCity", addCity);
app.post("/cityList", cityList);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log("connection error", error.message));

const db = mongoose.connection;
db.on("error", (error) => {
  console.log("error", error);
});
db.once("open", function () {
  console.log("Connected successfully");
  const Port = process.env.PORT || 5000;
  app.listen(Port, () => {
    console.log("app is running on port ", Port);
  });
});

module.exports.firebaseapp = firebaseapp;
