require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT;

const cohortsRouter = require("./routes/cohorts.routes");
// MONGOOSE CONNECTION

mongoose
  .connect(`${process.env.CONNECTION_STRING}`)
  .then((x) =>
    console.log(`🟢 Connected to Database: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to MongoDB", err));

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
app.use("/api/cohorts", cohortsRouter);
app.use("/api/students", require("./routes/students.routes"));

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
