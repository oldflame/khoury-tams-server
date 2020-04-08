var fillHours = {
  submitTaHours: (req, res) => {
    req.app.db.models.taHours.create(req.body, (err, taHoursFromDb) => {
      if (err) {
        console.log(err);
        return res.status(400);
      }
      return res.status(200).json(taHoursFromDb);
    });
  },

  getAllSubmittedTaHours: (req, res) => {
    const taId = req.params.taId;
    req.app.db.models.taHours.find({ taId: taId }, (err, allHours) => {
      if (err) {
        console.log("Error", err);
        return res.json([]);
      }
      console.log("Courses", allHours);
      return res.status(200).json(allHours);
    });
  },
};

module.exports = fillHours;
