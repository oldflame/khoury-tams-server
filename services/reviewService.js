var reviewService = {
    getAllReviews: (req, res) => {
        req.app.db.models.Review.find({}, (err, reviews) => {
            if (err) {
                console.log("Error", err);
                return res.json([]);
            }
            console.log("All Reviews: ", reviews);
            return res.status(200).json(reviews);
        });
    },

    getReviewsForCourse: (req, res) => {
        const id = req.params['courseId'];
        req.app.db.models.Review.find({courseId: id}, (err, review) => {
            if (err) {
                console.log("Error", err);
                return res.json([]);
            }
            console.log("Review: ", review);
            return res.status(200).json(review);
        });
    },

    submitReviewForCourse: (req, res) => {
        req.app.db.models.Review.create(req.body, (err, review) => {
            if (err) {
                console.log(err);
                return res.status(400);
            }
            console.log("Submitted Review: ", review);
            return res.status(200).json(review);
        });
    }
}

module.exports = reviewService
