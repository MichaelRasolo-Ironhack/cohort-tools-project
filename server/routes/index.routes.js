const express = require("express");
const router = express.Router();
const cohortsRouter = require('./cohorts.routes')
const studentsRouter = require('./students.routes')
const authRouter = require('./auth.routes')
const jwt = require("jsonwebtoken")
const User = require("../models/User.model.js")

router.use("/auth", authRouter)

router.use("/students", studentsRouter)
router.use("/cohorts", cohortsRouter)


module.exports = router