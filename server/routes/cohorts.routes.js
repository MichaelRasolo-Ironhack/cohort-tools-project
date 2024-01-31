const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort.model");
/* GET All Cohorts. */
router.get("/", function (req, res) {
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

// POST Create a Cohort
router.post("/api/cohorts", async (req, res) => {
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
    console.error("Error creating cohort:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET Cohort by iD
router.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const foundCohort = await Cohort.findById(req.params.cohortId);
    // If cohort is not found
    if (!foundCohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    // Response: status & json
    res.status(200).json(foundCohort);
  } catch (error) {
    console.error("Error retrieving cohort:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT Update a cohort by ID
router.put("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const foundCohort = await Cohort.findById(req.params.cohortId);

    // If cohort is not found
    if (!foundCohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }

    // Update based on the req body
    foundCohort.set(req.body);
    const updatedCohort = await foundCohort.save();

    // Response: status & json
    res.status(200).json(updatedCohort);
  } catch (error) {
    console.error("Error updating cohort:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// DELETE delete cohort by ID
router.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const result = await Cohort.deleteOne({ _id: req.params.cohortId });

    // If nothing deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Cohort not found" });
    }

    res.status(204).json(result);
  } catch (error) {
    console.error("Error deleting cohort:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
