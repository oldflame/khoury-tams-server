var course = require("./services/course");
var userService = require("./services/userService");
var applicationService = require("./services/applicationService")
var taService = require("./services/fill-hours");

exports = module.exports = (app) => {
    app.options("/*", (req, res) => {
        return res.status(200).json();
    });
    app.get("/courses/:stream", course.getCoursesForStream);
    app.get("/courses", course.getAllCourses);
    app.get("/courses/details/:crn", course.getMoreCourseDetails);
    app.post("/login", userService.login);
    app.post("/register", userService.register);
    app.post("/submitHours", taService.submitTaHours);
    app.get("/getHours/:taId", taService.getAllSubmittedTaHours)
    app.get("/users", userService.getAllUsers);
    app.get("/applications", applicationService.getAllApplications);
}
