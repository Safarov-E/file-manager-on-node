const express = require('express');
const router = express.Router();
const si = require('systeminformation');
const fs = require('fs');
const fss = require('fs-extra')

let tasks = ['C://']

router.get('/directory', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send(tasks)
});

router.get('/', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	let items = fs.readdirSync(tasks.join(''))
	res.json(items)
});

router.post('/name', function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	let disk = JSON.parse(req.body.param)
	handleDisk(disk.name);
	res.json(req.body);   
});

router.post('/value', function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	let value = JSON.parse(req.body.param)
	handleDirectory(value.name);
	res.json(req.body);   
});

router.post('/pathdirectory', function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	let value = JSON.parse(req.body.param)
	handleDirectoryInput(value.name);
	res.json(req.body);
});

router.get('/return', function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	if(tasks.length <= 1) {
		let leng = tasks.join('').substring(0, 2) + '/';
		let newA = tasks.map(item => {
			return item = leng
		})
		return tasks = newA
	}
	return tasks.pop();
});

handleDirectory = (disk) => {
	let newValue = '/' + disk
	tasks.push(newValue)
}

handleDirectoryInput = (disk) => {
	let newArr = [];
	newArr.push(disk)
	tasks = newArr
}

handleDisk = (disk) => {
	let newArr = [];
	newArr.push(disk)
	tasks = newArr
}


si.blockDevices(function(data) {
	const data1 = tasks.map(item => {
		let name = data[0].name + '/'
		return item = name
	})
	tasks = data1;
})

router.get('/disk', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	si.blockDevices(function(data) {
		res.json(data);
	})
});

router.post('/newRename', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	let newName = JSON.parse(req.body.param)
	let oldName = JSON.parse(req.body.param)
	fs.rename(oldName.old, newName.new, (err) => {
		if (err) console.log(err);
		console.log('renamed complete');
	});
});

router.post('/deletDir', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	let dirDelete = JSON.parse(req.body.param)
	fss.remove(dirDelete.del, err => {
		console.error(err)
	})
});

router.post('/createFolder', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	let createFolder = JSON.parse(req.body.param)
	fs.mkdir(createFolder.create, err => {
		console.error(err)
	})
});

router.post('/createFile', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	let createFolder = JSON.parse(req.body.param)
	console.log(createFolder.create)
	fs.appendFile(createFolder.create, '', (err) => {
		if (err) console.log(err);
		console.log('The "data to append" was appended to file!');
	});
});

router.post('/deleteButton', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	let createFolder = JSON.parse(req.body.param)
	fss.remove(createFolder.create, err => {
		console.error(err)
	})
});

module.exports = router;