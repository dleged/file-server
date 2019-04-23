const url = require('url');
const fs = require('fs');
const { isDirectory,getRootDirOrFile,transformPathToLink,getFullPathName,getFileBuffer } = require('./utils');
const root = process.cwd();
let historys = [];//记录跳转历史

function _isNormalFile(pathName){
	return pathName.includes('.json') || pathName.includes('.js') || pathName.includes('.css');
}

function _isHtmlUi(pathName){
		return pathName.includes('.html') || pathName.includes('.jsp');
}

function _404Response(res){
	res.writeHead(404,{'Content-Type': 'text/plain; charset=utf-8'});
	res.write('404 page not found!🙅');
	res.end();
}

function router(req, res){
	let pathName = url.parse(req.url).path;
	let fullPathName = getFullPathName(pathName);
	if(!fs.existsSync(fullPathName)){
		_404Response(res);
		return;
	}

	historys.push(pathName);

	if(isDirectory(fullPathName)){//若是文件夹子
		_renderDir(fullPathName,res);
	}else{
		if(pathName === '/'){
			_renderDir(root,res);
		}else{
			if(_isNormalFile(pathName)){//普通文件
				_renderJson(fullPathName,res);
			}else if(_isHtmlUi){//.html文件
				_renderHtml(fullPathName,res);
			}
		}
	}
}


function _forwardAndBack(res){//当浏览器返回不是html文件时，有问题；
	res.write('<div><a href="javascript:window.history.forward();">forward</a></div><div><a href="javascript:window.history.back();">back</a></div>')
}

function _renderDir(root,res){
	res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
	let _path = getRootDirOrFile(root);
	_forwardAndBack(res);
  res.end(transformPathToLink(_path).join('<br/>'));
}

function _renderJson(fullPathName,res){
		res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'});
		_forwardAndBack(res)
		getFileBuffer(fullPathName).then(function(buffer){
			res.write(buffer);
			res.end();
		})
}

function _renderHtml(fullPathName,res){
	res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
	_forwardAndBack(res)
	getFileBuffer(fullPathName).then(function(buffer){
		res.write(buffer);
		res.end();
	})
}

module.exports = {
	router
}
