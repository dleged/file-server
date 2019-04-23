const http = require('http');
const fs = require('fs');
const open = require('open');
const child_process = require('child_process');
const { router } = require('./lib/router');
// const options = {
//   key: fs.readFileSync('keys/agent2-key.pem'),
//   cert: fs.readFileSync('keys/agent2-cert.pem')
// };

const server = http.createServer((req, res) => {
	router(req,res)
});

server.listen(8080,function(){
	let serverUrl = 'http://localhost:8080/';
	console.log(serverUrl,'开启成功');
	child_process.exec('open ${serverUrl}',(error, stdout, stderr) => {
	  if (error) {
	    console.error(`执行出错: ${error}`);
	    return;
	  }
	  console.log(`stdout: ${stdout}`);
	  console.log(`stderr: ${stderr}`);
	});
});
