
/*
 * GET home page.
 * 路由文件，控制器
 */
//module.exports = function(app){
//	app.get('/',function(req, res){
//		res.render('index',{title:"首页"});
//	});
//	app.get('/reg',function(req, res){
////		res.render('reg',{title:"zh"});
//	});
//	
//};
exports.index = function(req, res){
  //功能是调用模板解析引擎，翻译名为 index 的模板
  console.log("username:"+req.session.username);
  res.render('index', { title: 'nodeJs' });
};

exports.hello = function(req, res){
	res.send("hello world");
};

exports.user = function(req, res){
};

exports.reg = function(req, res){
	res.render('reg', { title: '用户注册' });
};

exports.doReg = function(req, res){
	if(req.body['username']==''||req.body['username']==null){
		res.render('reg', { error: '请输入用户名',title: '用户注册' });
	}else
	if (req.body['password-repeat'] != req.body['password']) {
		console.log('error', '两次输入的口令不一致');
		res.render('reg', { error: '两次输入的口令不一致',title: '用户注册' });
	}else
		return res.redirect('/');
};

exports.login = function(req, res){
	res.render('login', { title: '用户登录' });
};

exports.doLogin = function(req, res){
	if(req.body['username']==''||req.body['username']==null||
			req.body['password']==''||req.body['password']==null){
		res.render('login', { error: '请输入用户名、密码',title: '用户登录' });
	}else{
		var session = req.session;
		var user = {
				name: req.body['username'],
				password: req.body['password'],
			};
		session.username=req.body['username'];
		session.user= user;
		return res.redirect('/');
	}
};

exports.logout = function(req, res){
	req.session.user = null;
	return res.redirect('/');
};