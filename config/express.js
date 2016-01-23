var express = require('express');
var morgan = require('morgan'); // ใช้ debug log
var compression = require('compression'); // ใช้ compression บีบอัด respons
var bodyParser = require('body-parser'); // path require() ทำงานตอน Compile
var sass = require('node-sass-middleware'); // ใช้ sass
var validator = require('express-validator'); // ใช้ตรวจสอบ ค่า จาก request form
var cookieSession = require('cookie-session');

module.exports = function(){
    var app = express();
    
    if(process.env.NODE_ENV === 'development'){ // เช็คค่าในตัวแปร NODE_ENV ว่าเป็น Dev หรือ product (SET NODE_ENV=development , export NODE_ENV=production)
        app.use(morgan('dev')); // ใช้ morgan แสดง Debug log
        
        var Sas_OPS = 'expanded';
        var Sas_Dbg = true;
        
    } else {
        app.use(compression()); 
        
        var Sas_OPS = 'compressed';
        var Sas_Dbg = false;
        
    }
    
    /* การรับค่าตัวแปรที่ request ส่งมา 
    
    ทำให้เวลาเรียก object สามารถทำได้โดย
    req.body.object1 , req,body.object2 เป็นต้น
    
    */
    
    app.use(bodyParser.urlencoded({ 
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(validator()); // ใช้ต่อ bodyParser เพราะเป็นการตรวจสอบจาก bodyParser
    
    
    
    app.set('views', './app/views'); // path app.set ทำงานตอน Runtime
    app.set('view engine', 'jade'); // คำสั่งใช้ jade ในการ render
    
    
    require('../app/routes/index.route')(app); // ยัด app => express() ใส่เข้าไปใน fucntion
    require('../app/routes/auth.route')(app);
    
    app.use(sass({ // สำคัญ ต้องเขียนไว้ก่อน express.static เพราะจะส่ง response ที่ complie แล้วไม่ได้
        src : './sass', // Folder SASS
        dest : './public/css', // Folder เป้าหมายที่ complied
        outputStyle : Sas_OPS,  // รูปแปปการ compile : compressed '' compact '' expanded ''
        prefix : '/css', // เป็นการตัด /css ออกก่อน request ex. http://<domain>/css/css/main.css => http://<domain>/css/main.css
        debug : Sas_Dbg
    }));
    
    app.use(express.static('./public')); // เอาไว้หลัง routing เพื่อ performace
    return app;
}