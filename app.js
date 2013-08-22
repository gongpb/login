
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var crypto = require('crypto');

var app = express();


//app.use(function(req,res,next){
//    res.locals.user=req.session.user;
//    res.locals.error=req.flash('error').length?req.flash('error'):null;
//    res.locals.success=req.flash('success').length?req.flash('success'):null;
//      next();
//});

app.use(express.cookieParser()); //Cookie 解析的中间件。express.session() 则提供会话支持
app.use(express.session({ secret: "keyboard cat" }));

app.locals({
	 // config: config,
	  //title: config.title
});
	//app.dynamicHelpers
app.use(function(req, res, next){
//	  res.locals.title = title;
	  res.locals.csrf = req.session ? req.session._csrf : '';
	  res.locals.req = req;
	  res.locals.user = req.session.user;
	  next();
});




// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride()); //methodOverride用于支持定制的 HTTP 方法

app.configure(function(){
	app.use(app.router); //router 是项目的路由支持
	app.use(express.static(path.join(__dirname, 'public'))); //static 提供了静态文件支持
});



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);  //将“ / ”路径映射到 exports.index函数下
app.get('/hello',routes.hello);

app.get('/u/:user',routes.user);
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);

app.get('/login',routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
