var course = require("./services/course");
var userService = require("./services/userService");
var applicationService = require("./services/applicationService");
var taService = require("./services/fill-hours");
var reviewService = require("./services/reviewService");

exports = module.exports = (app) => {
  app.options("/*", (req, res) => {
    return res.status(200).json();
  });
  app.post("/addCourse", course.addCourse);
  app.get("/courses/:stream", course.getCoursesForStream);
  app.get("/courses", course.getAllCourses);
  app.get("/courses/details/:crn", course.getMoreCourseDetails);
  app.get("/instructors", course.getAllInstructors);
  app.get("/courseNames", course.getAllCourseNames);
  app.put("/updateCourse", course.updateCourse);
  app.get("/course/:id", course.getCourseById);
  app.get("/courses/details/:crn", course.getMoreCourseDetails);
  app.post("/login", userService.login);
  app.post("/register", userService.register);
  app.post("/submitHours", taService.submitTaHours);
  app.get("/getHours/:taId", taService.getAllSubmittedTaHours);
  app.get("/users", userService.getAllUsers);
  app.get("/applications", applicationService.getAllApplications);
  app.post("/submitApplication", applicationService.submitApplication);
  app.get(
    "/getSubmittedApplication/:studentId",
    applicationService.getApplicationOfStudent
  );
  app.put("/profile/:profileId", userService.updateUserById);
  app.get("/users/:userId", userService.getUserById);
  app.get("/reviews", reviewService.getAllReviews);
  app.get("/course/:courseId/reviews", reviewService.getReviewsForCourse);
  app.post("/course/:courseId/reviews", reviewService.submitReviewForCourse);
  app.put("/followUser", userService.followUser);
  app.put("/unFollowUser", userService.followUser);
};
