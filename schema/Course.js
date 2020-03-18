"use strict";

exports = module.exports = function(app, mongoose) {
  var devSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, unique: true },
    title: String,
    CRN: String,
    code: String,
    Instructors: String,
    stream: String
    // added_by : {type: mongoose.Schema.Types.ObjectId, ref: 'Admin'}
  });

  devSchema.index({ _id: 1 }, { unique: true });
  app.db.model("Course", devSchema);
};
