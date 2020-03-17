var course = {

    getAllCourses: (req,res) => {
        return res.json({"message": "hello"})
    },

    getCoursesForStream: (req,res) => {
        return res.json()
    }
}

module.exports = course