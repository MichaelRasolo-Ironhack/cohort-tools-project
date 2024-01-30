const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 5005;
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

// MONGOOSE CONNECTION

mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then((x) =>
    console.log(`🟢 Connected to Database: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts from DB:", cohorts);
      res.json(cohorts);
    })
    .catch((err) => {
      console.log("Error retrieving cohorts from DB:", err);
      res.status(500).send({ error: "Failed to retrived cohorts from DB" });
    });
});

app.get("/students", (req, res) => {
  Student.find({})
    .then((students) => {
      console.log("Retrieved students from DB:", students);
      res.json(students);
    })
    .catch((err) => {
      console.log("Error retrieving students from DB:", err);
      res.status(500).send({ error: "Failed to retrived students from DB" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
