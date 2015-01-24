var express     = require('express'),
    router      = express.Router();

var Auth		= require(__dirname+'/auth'),
	File     	= require(__dirname+'/file'),
	Project		= require(__dirname+'/project');

var auth 		= new Auth(),
	file 		= new File(),
	project 	= new Project();

router.post('/file', function(r,s) {
	var path 		= r.body.path,
		filename 	= r.body.filename;
		method		= r.body.method;
	if (method == read) {
		file.readFile(path, filename, function(data) {
		s.send(data);
	})
	} else{
		file.newFile(path, filename, function(data) {
		s.send(data);
	})
	};
	
})

router.put('/file', function(r,s) {
	var path 		= r.body.path,
		filename 	= r.body.filename,
		newname		= r.body.newname;

	file.renameFile(path, filename, newname, function(data) {
		s.send(data);
	})
})

router.delete('/file', function(r,s) {
	var path 		= r.body.path,
		filename 	= r.body.filename;

	file.deleteFile(path, filename, function(data) {
		s.send(data);
	})
})

router.post('/folder', function(r,s) {
	var parent;
	var path 		= r.body.path;
	if (r.body.parent) {
		parent		= r.body.parent;
	};

	file.newFolder(path, parent, function(data) {
		s.send(data);
	})
})

router.put('/folder', function(r,s) {
	var path 		= r.body.path,
		newname 	= r.body.newname;

	file.renameFolder(path, newname,function(data) {
		s.send(data);
	})
})

router.delete('/folder', function(r,s) {
	var path 		= r.body.path;
	
	file.deleteFolder(path, function(data) {
		s.send(data);
	})
})

router.get('/salin', function(r,s){
	project.createZip(r.query.path, r.query.filename, s);
})

router.post('/salin', function(r,s){
	project.copyProject(r.body.source, r.body.target, function(a){
		s.send(a);
	});
})

router.post('/auth', function(r,s) {
	var	id = {
		id	: r.body.id
	}
	auth.login(r, s, id, function(data) {
		s.send(data);
	})
})

router.delete('/auth', function(r,s) {
	auth.logout(r, s ,function(data) {
		s.send(data);
	})
})

module.exports = router;