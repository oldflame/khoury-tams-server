var course = require("./services/course");

exports = module.exports = app => {
  app.get("/courses/:stream", course.getCoursesForStream);
  app.get("/courses", course.getAllCourses);
  app.get("/courses/details/:crn",course.getMoreCourseDetails);
};
