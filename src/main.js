const Router = require('./database/database');
const app    = require('./app/builder');

Router.init();
const database = app.Build()

exports('Load', () => database);