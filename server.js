process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // กำหนดค่าให้ NODE_ENV หรือยัง

var express = require('./config/express'); // ไปเรียกไฟล์ config express
var app = express();
app.listen(8080);
module.exports = app;
console.log('Server runing on port 8080');