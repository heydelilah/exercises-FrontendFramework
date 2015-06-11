var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	Bourne = require('bourne'),
	crypto = require('crypto');

var router = express.Router(),
	db = new Bourne('users.json');

// 密码加密
function hash(password){
	return crypto.createHash('md5').update(password).digest('hex');
}

router.use(bodyParser.urlencoded())
	.use(bodyParser.json())
	.use(session({'secret':'asfag'}));


router
	// 获取当前登陆界面
	.get('/login', function(req, res){
		res.sendfile('public/login.html')
	})
	// 登入
	.post('/login', function(req, res){
		var user = {
			username: req.body.username,
			password: hash(req.body.password)
		};

		db.findOne(user, function(err, data){
			if(data){
				req.session.userId = data.id;
				res.redirect('/');
			}else{
				res.redirect('/login');
			}
		});

	})
	// 注册
	.post('/signup', function(req, res){
		var user = {
			username: req.body.username,
			password: hash(req.body.password),
			options: {}
		};

		// 检验是否重名？
		db.findOne({username: user.username}, function(err, data){
			if(err){
				console.log(err);
			}else{
				if(!data || (data&&!data.length) ){
					db.insert(user, function(err, data){
						req.session.userId = data.id;
						res.redirect('/')
					})
				}else{
					res.redirect('/login');
				}
				
			}
		})

	})
	// 登出
	.get('/logout', function(req, res){
		req.session.userId = null;
		res.redirect('/login');

	})
	.use(function(req, res, next){
		if (req.session.userId) {
			db.findOne({ id: req.session.userId }, function (err, data) {
		    	req.user = data;
			});
		}
		next();
	})

	// 设置
	// 获取setting数据
	.get('/options/display_field', function(req, res){
		// 判断是否已登陆
		if(!req.user){
			res.json([]);
		}else{
			res.json(req.user.options.display_field || []);
		}
	})
	.post('/options/display_field', function(req, res){
		// @疑问：这里还要判断用户登录情况吗？
		req.user.options.display_field = req.body.field;
		console.log(req.user);
		db.update({id: req.user.id}, req.user, function(err, data){
			console.log(data)
			res.json(data[0].options.display_field);
		})
	})

module.exports = router;





