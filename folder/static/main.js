/**
 * Created by 范端端 on 2019/3/5.
 */

const http = require('http');
const { router } = require('./lib/router');

const server = http.createServer((req, res) => {
	router(req,res)
});

server.listen(8080);
