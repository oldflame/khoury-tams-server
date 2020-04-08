'use strict';

exports = module.exports = (app, mongoose) => {
  require('./schema/Course')(app, mongoose);
  require('./schema/User')(app, mongoose);
  require('./schema/Application')(app, mongoose);
};
