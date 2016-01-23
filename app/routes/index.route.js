module.exports = function(app){  //(app) เป็นการยัด express เข้ามาใช้งาน
    var index = require('../controllers/index.controller'); // ไปเรียก controller index
    app.get('/', index.render); // ถ้า route '/' ให้ไปใช้ controller index
}