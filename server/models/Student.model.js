const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentShema = new Schema({
  fisrtName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: [String],
  program: String,
  background: String,
  image: String,
  projects: [String],
  cohort: { type: Schema.Types.ObjectId, ref: "Cohort" },
});

const Student = mongoose.model("Student", cohortShema);

module.exports = Student;
