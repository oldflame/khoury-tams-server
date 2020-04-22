"use strict";

exports = module.exports = function (app, mongoose) {
  var ApplicationSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      required: true,
    },
    currentGpa: {
      type: String,
      required: true,
    },
    gpaInSubject: {
      type: String,
    },
    lookingForCoop: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    courseNumber: {
      type: String,
      required: true,
    },
    profTakingCourse: {
      type: String,
    },
    studentId: {
      type: String,
      required: true,
    },
    status: {
      type:String,
      required: true,
    }
  });
  ApplicationSchema.index({ _id: 1 }, { unique: true });
  app.db.model("Application", ApplicationSchema);
};
