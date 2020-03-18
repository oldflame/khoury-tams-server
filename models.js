'use strict';

exports = module.exports = (app, mongoose) => {
  require('./schema/Course')(app, mongoose);
};
