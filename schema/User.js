"use strict";

exports = module.exports = function(app, mongoose) {
var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
      },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        required: true,
        type: String
    }
  });
  UserSchema.index({ _id: 1 }, { unique: true });
  app.db.model("User", UserSchema);
};
