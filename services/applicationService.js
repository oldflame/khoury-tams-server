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

};

module.exports = application;
