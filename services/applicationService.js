var application = {
    getAllApplications: (req, res) => {
        req.app.db.models.Application.find({}, (err, applications) => {
            if (err) {
                console.log("Error", err);
                return res.json([]);
            }
            console.log("Applications", applications);
            return res.status(200).json(applications);
        });
    }

    // getCoursesForStream: (req, res) => {
    //     const streamValue = req.params.stream;
    //     req.app.db.models.Course.find({ stream: streamValue }, (err, courses) => {
    //         if (err) {
    //             console.log("Error", err);
    //             return res.json([]);
    //         }
    //         console.log("Courses", courses);
    //         return res.status(200).json(courses);
    //     }).select("_id Course CRN Title Instructors stream");
    // },

    // getMoreCourseDetails: (req, res) => {
    //     const crn = req.params.crn;
    //     console.log("Details for: ", crn);
    //     req.app.db.models.Course.find({CRN: crn}, (err,courses)=> {
    //         if(err){
    //             console.log("Error",err);
    //             return res.json([]);
    //         }
    //         console.log("Course Details",courses);
    //         return res.status(200).json(courses);
    //     })
    // }
};

module.exports = application;
