const http = require('http');
const fs = require('fs');
const { router } = require('./lib/router');
// const options = {
//   key: fs.readFileSync('keys/agent2-key.pem'),
//   cert: fs.readFileSync('keys/agent2-cert.pem')
// };

const server = http.createServer((req, res) => {
	router(req,res)
});

server.listen(8080,function(){
	console.log('http://localhost:8080/ 开启成功');
});
