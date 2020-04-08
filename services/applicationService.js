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
            return res.status(200).json(application);
        });
    },
};

module.exports = application;
