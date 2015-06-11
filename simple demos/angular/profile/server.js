

var fs = require('fs');
var http = require('http');
var url = require('url');


function onRequest(request, response){


	var pathname = url.parse(request.url).pathname;

	// 去掉第一个\
	pathname = pathname.replace('\/','');

	if(pathname == ''){
		pathname = 'index.html';
	}

	console.log(pathname);

	var file = fs.readFileSync(pathname);

	response.writeHead(200, {'Content-Type': 'html'});
	response.write(file);
	response.end();

}

http.createServer(onRequest).listen(8888);


