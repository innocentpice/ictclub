exports.login = function(req, res){
    console.log('Email: ' + req.body.email + ' Password: ' + req.body.password);
    if(req.body.email){
        res.render('login', {
            'username': req.body.email
        });
    }else{
        res.render('index', {
            'MsgWarning': "Can't Login in this time."
        });
    }
}