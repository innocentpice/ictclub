module.exports = function(app){
    var auth = require('../controllers/auth.controller');
    app.all('/login', auth.login);
}