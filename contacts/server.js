var express = require('express'),
	api = require('./api'),
	account = require('./accounts'),
	app = express();


app
	// 设置静态文件目录
	.use(express.static('./public'))
	.use(account)
	// 设置api
	.use('/api', api);



// 返回初始首页文件
app.get('*', function(req, res){

	if(!req.user){
		res.redirect('/login');
	}
	else{
		res.sendfile('public/main.html');
	}
});

// 监听端口
app.listen(3000);
