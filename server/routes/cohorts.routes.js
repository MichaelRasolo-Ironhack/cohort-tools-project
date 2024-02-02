const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort.model");
const isAuthenticated = require("../middleware/isAuthenticated");

/* GET All Cohorts. */
router.get("/", function (req, res, next) {
  const { campus, program } = req.query;
  const filters = {};
  if (campus) {
    filters.campus = campus;
  }
  if (program) {
    filters.program = program;
  }
  console.log(filters);
  Cohort.find(filters)
    .then((cohorts) => {
      console.log("Retrieved cohorts from DB:", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      next(error);
    });
});

// POST Create a Cohort
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const {
      inProgress,
      cohortSlug,
      cohortName,
      program,
      campus,
      startDate,
      endDate,
      programManager,
      leadTeacher,
      totalHours,
    } = req.body;

    const newCohort = new Cohort({
      inProgress,
      cohortSlug,
      cohortName,
      program,
      campus,
      startDate,
      endDate,
      programManager,
      leadTeacher,
      totalHours,
    });

    const savedCohort = await newCohort.save();

    // Response: status & json
    res.status(201).json(savedCohort);
  } catch (error) {
    next(error);
  }
});

// GET Cohort by iD
router.get("/:cohortId", async (req, res, next) => {
  try {
    const foundCohort = await Cohort.findById(req.params.cohortId);

    if (!foundCohort) {
      return res.status(202).send({ message: "Cohort not found" });
    }
    // Response: status & json
    res.status(200).json(foundCohort);
  } catch (error) {
    next(error);
  }
});

// PUT Update a cohort by ID
router.put("/:cohortId", isAuthenticated, async (req, res, next) => {
  try {
    const updatedCohort = await Cohort.findOneAndUpdate(
      { _id: req.params.cohortId },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCohort);
  } catch (error) {
    next(error);
  }
});

// DELETE delete cohort by ID
router.delete("/:cohortId", isAuthenticated, async (req, res, next) => {
  try {
    const result = await Cohort.deleteOne({ _id: req.params.cohortId });

    // If nothing deleted
    if (result.deletedCount === 0) {
      return res.status(202).json({ message: "Cohort not found" });
    }

    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
