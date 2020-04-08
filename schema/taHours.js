"use strict";
var moment = require("moment");

exports = module.exports = function (app, mongoose) {
  var taHoursSchema = new mongoose.Schema({
    //_id: { type: mongoose.Schema.Types.ObjectId, unique: true },
    taId: String,
    day: String,
    hours: Number,
    activities: String,
    submittedAt: {
      type: Date,
      default: Date.now
    },
    confirmedAt: Date,
  });

  taHoursSchema.index({ _id: 1 }, { unique: true });
  app.db.model("taHours", taHoursSchema);
};
