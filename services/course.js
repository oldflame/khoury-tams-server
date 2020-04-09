var course = {
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

  getCourseById:(req, res) => {
    const id = req.params.id;
    console.log("Fetching courses for: ", id);
    req.app.db.models.Course.find({_id: id}, (err, course) => {
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
    req.app.db.models.Course.find({CRN: crn}, (err,courses)=> {
        if(err){
            console.log("Error",err);
            return res.json([]);
        }
        console.log("Course Details",courses);
        return res.status(200).json(courses);
    })
  },

  updateCourse: (req, res) => {
    req.app.db.models.Courses.update(req.body, (err, course) => {
      console.log("Wokring for course:" , course);
      if (err) {
        console.log(err);
        return res.status(400);
      }
      return res.status(200).json(course);
    });
  }
};

module.exports = course;