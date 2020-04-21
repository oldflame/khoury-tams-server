"use strict";

exports = module.exports = function (app, mongoose) {
  var devSchema = new mongoose.Schema({
    Title: String,
    Course: String,
    CRN: String,
    code: String,
    Instructors: String,
    stream: String,
    meetingTime: String,
    Room: Number,
    Size: Number,
    Capacity: Number,
    Enrollment: Number,
    Waitlist: Number
    // added_by : {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'}
  });

  devSchema.index({ _id: 1 }, { unique: true });
  app.db.model("Course", devSchema);
};
