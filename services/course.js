var course = {
  addCourse: (req, res) => {
    req.app.db.models.Course.create(req.body, (err, course) => {
      if (err) {
        console.log("Error", err);
        return res.json();
      }
      console.log("Course", course);
      return res.status(200).json(course);
    });
  },

  getAllCourses: (req, res) => {
    req.app.db.models.Course.find({}, (err, courses) => {
      if (err) {
        console.log("Error", err);
        return res.json([]);
      }
      console.log("Courses", courses);
      return res.status(200).json(courses);
    });
  },

  getAllCourseNames: (req, res) => {
    req.app.db.models.Course.find({}, (err, courses) => {
      if (err) {
        console.log("Error", err);
        return res.json([]);
      }
      console.log("Courses", courses);
      return res.status(200).json(courses);
    }).select("Course CRN Title Instructors");
  },

  getAllInstructors: (req, res) => {
    req.app.db.models.Course.find({}, (err, courses) => {
      if (err) {
        console.log("Error", err);
        return res.json([]);
      }
      console.log("Courses", courses);
      return res.status(200).json(courses);
    }).select("Instructors");
  },

  getCoursesForStream: (req, res) => {
    const streamValue = req.params.stream;
    req.app.db.models.Course.find({ stream: streamValue }, (err, courses) => {
      if (err) {
        console.log("Error", err);
        return res.json([]);
      }
      console.log("Courses", courses);
      return res.status(200).json(courses);
    }).select("_id Course CRN Title Instructors stream");
  },

  getCourseById: (req, res) => {
    const id = req.params.id;
    console.log("Fetching courses for: ", id);
    req.app.db.models.Course.find({ _id: id }, (err, course) => {
      if (err) {
        console.log("Error", err);
        return res.json([]);
      }
      console.log("Course for id: ", course);
      return res.status(200).json(course);
    });
  },

  getMoreCourseDetails: (req, res) => {
    const crn = req.params.crn;
    console.log("Details for: ", crn);
    req.app.db.models.Course.findOne({ CRN: crn }, (err, courses) => {
      if (err) {
        console.log("Error", err);
        return res.json([]);
      }
      console.log("Course Details", courses);
      return res.status(200).json(courses);
    });
  },

  updateCourse: (req, res) => {
    req.app.db.models.Course.update(
      { _id: req.body.course._id },
      req.body.course,
      (err, course) => {
        console.log("Wokring for course:", course);
        if (err) {
          console.log(err);
          return res.status(400);
        }
        return res.status(200).json(course);
      }
    );
  },
};

module.exports = course;
