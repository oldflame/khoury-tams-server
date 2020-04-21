const config = require("../config");
const saltRounds = 10;
var bcrypt = require("bcrypt");
var _ = require("lodash");
var jwt = require("jsonwebtoken");

var getAuthToken = (user) => {
    return jwt.sign(user, config.secret);
};

var verifyToken = (token) => {
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            return null;
        } else {
            return decoded;
        }
        console.log("In bcrtpt result", result);
        if (result) {
          var token = getAuthToken(result);
          user = user.toObject();
          user["authToken"] = token;
          return res.status(200).json(user);
        }
        return res.status(401).json();
      });
};

var userService = {
    login: (req, res) => {
        req.app.db.models.User.findOne({email: req.body.email}, (err, user) => {
            if (err) {
                console.log("Error", err);
                return res.status(401).json();
            }
            if (!user) {
                console.log("No user found!!");
                return res.status(401).json();
            }
            console.log("USer", user);
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (err) {
                    console.log("In bcrtpt error", err);
                    return res.status(401).json;
                }
                console.log("In bcrtpt result", result);
                if (result) {
                    var token = getAuthToken(result);
                    user = user.toObject();
                    user['authToken'] = token;
                    return res.status(200).json(user);
                }
                return res.status(401).json();
            });
        });
    },

    getAllUsers: (req, res) => {
        req.app.db.models.User.find({}, (err, users) => {
            if (err) {
                console.log("Error", err);
                return res.json([]);
            }
            console.log("Users", users);
            return res.status(200).json(users);
        });
    },

 
    updateUserById: (req, res) => {
        req.app.db.models.User
            .update({_id: req.params['profileId']},
                    {
                        $set: {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            phoneNumber: req.body.phoneNumber
                        }
                    }, (err, user) => {
                    console.log("User", user);
                    if (err) {
                        console.log(err);
                        return res.status(400);
                    }
                });
        return req.app.db.models.User
            .find({_id: req.params['profileId']})
    },
    getUserById: (req, res) => {
        req.app.db.models.User.find({_id: req.params['userId']}, (err, user) => {
            if (err) {
                console.log("Error", err);
                return res.json([]);
            }
            console.log("Users", user);
            return res.send(user);
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

  followUser: (req, res) => {
    var workflow = req.app.utility.workflow(req, res);
    workflow.on("updateCurrentUser", () => {
      req.app.db.models.User.updateOne(
        { _id: req.body.currentUser._id },
        { $set: req.body.currentUser },
        (err, user) => {
          if (err) {
            console.log("Failure 1", err);
            return res.status(501);
          }
          console.log(user);
          workflow.emit("updateFollowedUser");
        }
      );
    });
    workflow.on("updateFollowedUser", () => {
      req.app.db.models.User.updateOne(
        { _id: req.body.followedUser._id },
        { $set: req.body.followedUser },
        (err, user) => {
          if (err) {
            console.log("Failure 2", err);
            return res.status(501);
          }
          return res.status(200).json(user.nModified);
        }
      );
    });

    workflow.emit("updateCurrentUser");
  }
};
module.exports = userService;
