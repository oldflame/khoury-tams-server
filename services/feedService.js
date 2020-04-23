var feed = {
  getFeedForUser: (req, res) => {
    var workflow = req.app.utility.workflow(req, res);
    workflow.on("findUserById", () => {
      req.app.db.models.User.findOne(
        { _id: req.params["userId"] },
        (err, user) => {
          if (err) {
            console.log("Error", err);
            return res.json([]);
          }
          console.log("Users", user);
          workflow.emit("getFeed", user);
        }
      );
    });

    workflow.on("getFeed", (user) => {
      console.log("user", user);
      req.app.db.models.Feed.find({$or: [{postedBy: user._id},
        { postedBy: { $in: user.following } }]},
        (err, feed) => {
          if (err) {
            console.log("Error", err);
            return res.json([]);
          }
          return res.status(200).json(feed);
        }
      ).populate('postedBy');
    });

    workflow.emit('findUserById');
  },

  postFeed: (req, res) => {
    var mongoose = require('mongoose')
    const post = {
      postedBy: mongoose.Types.ObjectId(req.body.post.postedBy),
      postedByRole: req.body.post.postedByRole,
      tags: req.body.post.tags,
      title: req.body.post.title,
      content: req.body.post.content,
    };
    req.app.db.models.Feed.create(post, (err, feed) => {
      if (err) {
        console.log("Error", err);
        return res.json();
      }
      console.log("Feed", feed);
      return res.status(200).json(feed);
    });
  },

  deletePost: (req,res) => {
    req.app.db.models.Feed.deleteOne(
      { _id: req.params.postId },
      (err, post) => {
        if (err) {
          console.log("Error", err);
          return res.json([]);
        }
        console.log("Applications", post);
        return res.status(200).json(post);
      }
    );
  },
  }
};

module.exports = feed;
