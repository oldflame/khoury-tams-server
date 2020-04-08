"use strict";

exports = module.exports = function (app, mongoose) {
    var ApplicationSchema = new mongoose.Schema(
        {
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
            level: {
                type: String,
                required: true,
            },
            gpaInSubject: {
                type: String,
                required: true,
            },
            lookingForCoop: {
                type: String,
                required: true
            },
            notes: {
                type: String
            },
            courseNumber: {
                type: String,
                required: true
            },
            profTakingCourse: {
                type: String,
                required: true
            }
        });
    ApplicationSchema.index({_id: 1}, {unique: true});
    app.db.model("Application", ApplicationSchema);
};
