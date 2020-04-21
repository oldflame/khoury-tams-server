"use strict";

exports = module.exports = function (app, mongoose) {
  var feedSchema = new mongoose.Schema({
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postedByRole: String,
    tags: [String],
    timestamp: {
      type: Date,
      default: Date.now,
    },
    title: String,
    content: String,
  });

  feedSchema.index({ _id: 1 }, { unique: true });
  app.db.model("Feed", feedSchema);
};
