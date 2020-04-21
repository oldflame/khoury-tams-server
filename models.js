'use strict';

exports = module.exports = (app, mongoose) => {
    require('./schema/Course')(app, mongoose);
    require('./schema/User')(app, mongoose);
    require('./schema/Application')(app, mongoose);
    require('./schema/taHours')(app, mongoose);
    require('./schema/Review')(app, mongoose);
    require('./schema/Feed')(app,mongoose);
};
