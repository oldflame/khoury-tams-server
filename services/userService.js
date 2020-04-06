const saltRounds = 10;
var bcrypt = require("bcrypt");
var _ = require("lodash");

var userService = {
  login: (req, res) => {
    req.app.db.models.User.findOne({email:req.body.email}, (err, user) => {
      if (err) {
        console.log("Error", err);
        return res.status(401).json;
      }
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) {
          console.log("In bcrtpt error",err);
          return res.status(401).json;
        }
        console.log("In bcrtpt result",result);
        if (result) {
          return res.status(200).json(user);
        }
        return res.status(401).json();
      });
    });
  },

  register: (req, res) => {
    var workflow = req.app.utility.workflow(req, res);
    workflow.on("createUserObject", function () {
      var userRegisterObject = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
      };
      console.log("Hashing", req.body);
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          console.log("Password hashing failed", err);
          return res.status(501);
        }
        userRegisterObject.password = hash;
        workflow.emit("writeUserObjectToDB", userRegisterObject);
      });
    });
    workflow.on("writeUserObjectToDB", (userObject) => {
      req.app.db.models.User.create(userObject, (err, user) => {
        if (err) {
          console.log(err);
          return res.status(400);
        }
        return workflow.emit("response");
      });
    });
    workflow.emit("createUserObject");
  },
};
module.exports = userService;
