const router = require("express").Router();
const Students = require("../models/Student.model");

// get all students
router.get("/", async (req, res, next) => {
  try {
    const allStudents = await Students.find({});
    res.json(allStudents);
  } catch (error) {
    console.error("Error when getting all students", error);
  }
});

// get one specific student
router.get("/:studentId", async (req, res, next) => {
  try {
    const oneStudent = await Students.findById(req.params.id);
    res.status(200).res.json(oneStudent);
  } catch (error) {
    console.error("Error when getting one student", error);
  }
});

// update a student
router.put("/:studentId", async (req, res, next) => {
  try {
    const updateStudent = await Students.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).res.json(updateStudent);
  } catch (error) {
    console.error("Error when update one student", error);
  }
});

// delete a student
router.put("/:studentId", async (req, res, next) => {
  try {
    const deleteStudent = await Students.findByIdAndDelete(req.params.id);
    res.status(204).res.json(deleteStudent);
  } catch (error) {
    console.error("Error when delete one student", error);
  }
});

module.exports = router;
