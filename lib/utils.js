const fs = require('fs');
const path = require('path');
const root = process.cwd();


function isDirectory(path){
	return fs.statSync(path).isDirectory();
}

//将路径转换成a标签
function transformPathToLink(paths){
	return paths.map(function(path,index){
		let _path = path.replace(root,'');
		return `<a href='${_path}'>${_path}</a>`;
	});
}

//获取当前目录下的文件夹或文件
function getRootDirOrFile(root){
	let filePool = [];
	let paths = fs.readdirSync(root);
	paths.forEach((dir) => {
		let _path = path.join(root,dir);
			 filePool.push(_path);
	})
	return filePool;
}

//从项目跟目录开始jion路径
function getFullPathName(pathName){
	return path.join(root,pathName);
}

//获取可读流
function getFileBuffer(fullPathName){
	return new Promise(function(resolve,reject){
		const stream = fs.createReadStream(fullPathName);
		let buffer = '';
		stream.on('data',function(chunk){
	    buffer += chunk;
		})
		stream.on('end',function(chunk){
		    resolve(buffer)
		})
		stream.on('error',function(err){
    	reject(err);
		})
	})
}


module.exports = {
	isDirectory,
	getRootDirOrFile,
	transformPathToLink,
	getFullPathName,
	getFileBuffer
}
