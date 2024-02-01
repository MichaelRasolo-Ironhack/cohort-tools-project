const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
  inProgress: { type: Boolean, required: true, default:false },
  cohortSlug: { type: String, required: true },
  cohortName: { type: String, required: true },
  program: {
    type: String,
    required: true,
    enum: ["Web Development", "UX/UI", "Data Analytics", "Cybersecurity"],
  },
  campus: {
    type: String,
    required: true,
    enum: [
      "Madrid",
      "Barcelona",
      "Paris",
      "Berlin",
      "Miami",
      "Amsterdam",
      "Remote",
    ],
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  programManager: { type: String, required: true },
  leadTeacher: { type: String, required: true },
  totalHours: { type: Number, required: true, min: 1 },
});

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;
