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
    },
    submitApplication: (req, res) => {
        req.app.db.models.Application.create(req.body, (err, application) => {
            if (err) {
                console.log(err);
                return res.status(400);
            }
            console.log("Submitted app: ", application);
            return res.status(200).json(application);
        });
    },
    getApplicationOfStudent: (req, res) => {
        req.app.db.models.Application.find({studentId: req.params.studentId}, (err, applicationsOfStudent) => {
            if (err) {
                console.log("Error", err);
                return res.json([]);
            }
            console.log("Applications", applicationsOfStudent);
            return res.status(200).json(applicationsOfStudent);
        });
    }
};

module.exports = application;
