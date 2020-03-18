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

  getCoursesForStream: (req, res) => {
    const streamValue = req.params.stream;
    console.log("Fetching courses for: ", streamValue);
    req.app.db.models.Course.find({ stream: streamValue }, (err, courses) => {
      if (err) {
        console.log("Error", err);
        return res.json([]);
      }
      console.log("Courses", courses);
      return res.status(200).json(courses);
    }).select("_id Course CRN Title Instructors stream");
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
  }
};

module.exports = course;
