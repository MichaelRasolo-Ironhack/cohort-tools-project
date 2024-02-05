const router = require("express").Router();
const Student = require("../models/Student.model");
const isAuthenticated = require('../middleware/isAuthenticated');
const Cohort = require("../models/Cohort.model");

// get all students
router.get("/", async (req, res, next) => {
  try {
    const allStudents = await Student.find();
    res.json(allStudents);
  } catch (error) {
    console.error("Error when getting all students", error);
  }
});

// get one specific student
router.get("/:studentId", async (req, res, next) => {
  try {
    const oneStudent = await Student.findById(req.params.studentId);
    res.status(200).json(oneStudent);
  } catch (error) {
    console.error("Error when getting one student", error);
  }
});

// get one specific student
router.get("/cohort/:cohortId", async (req, res, next) => {
  try {
    const cohortStudents = await Student.find({cohort: req.params.cohortId});
    res.status(200).json(cohortStudents);
  } catch (error) {
    console.error("Error when getting all students from the cohort", error);
  }
});


// update a student
router.put("/:studentId",isAuthenticated,async (req, res, next) => {
  try {
    const updateStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true }
    );
    res.status(200).json(updateStudent);
  } catch (error) {
    console.error("Error when update one student", error);
  }
});

// delete a student
router.delete("/:studentId", isAuthenticated, async (req, res, next) => {
  try {
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    res.status(204).json(deleteStudent);
  } catch (error) {
    console.error("Error when delete one student", error);
  }
});



module.exports = router;
