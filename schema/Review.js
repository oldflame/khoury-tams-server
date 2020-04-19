"use strict";

exports = module.exports = function (app, mongoose) {
    var ReviewSchema = new mongoose.Schema({
                                               courseId: {
                                                   type: String,
                                                   required: true,
                                                   trim: true
                                               },
                                               firstName: {
                                                   type: String,
                                                   required: true
                                               },
                                               lastName: {
                                                   type: String,
                                                   required: true
                                               },
                                               userId: {
                                                   type: String,
                                                   required: true,
                                                   trim: true
                                               },
                                               title: {
                                                   type: String,
                                                   required: true,
                                                   trim: true
                                               },
                                               review: {
                                                   required: true,
                                                   type: String
                                               },
                                               takenBefore: {
                                                   type: Boolean
                                               },
                                               semesterTaken: {
                                                   type: String
                                               },
                                               yearTaken: {
                                                   type: String
                                               }
                                           });
    ReviewSchema.index({_id: 1}, {unique: true});
    app.db.model("Review", ReviewSchema);
};
