var fillHours = {
    submitTaHours: (req, res) => {
        req.app.db.models.taHours.create(req.body, (err,taHoursFromDb ) => {
            if (err) {
              console.log(err);
              return res.status(400);
            }
            return res.status(200).json(taHoursFromDb);
          });
    }
};

module.exports = fillHours;