var Auth        = require('../lib/auth'),
    File        = require('../lib/file'),
    Model       = require('../lib/model'),
    Project     = require('../lib/project');
var auth        = new Auth(),
    file        = new File(),
    model       = new Model(),
    project     = new Project();

var Editor = function(app,io) {
	io.on('connection', function(socket) {
		socket.on('open', function(e) {
			file.readFile(e.path, function(f) {
				io.emit('open', {name : e.name, data : f, path : e.path});
			})
		})
		socket.on('update', function(data) {
			io.emit('update', {data : data.data, name : data.name, path : data.path});
			file.saveFile(data.path, data.data, function(data) {
			})
		})
		socket.on('renameFile', function(data) {
			file.renameFile(data.path, data.filename, data.newname, function(e) {
				io.emit('renameFile',{
					target : data.target, newname : data.newname, rel : data.path+'/'+data.newname});
			})
		})
		socket.on('renameFolder', function(data) {
			io.emit('renameFolderInit');
			file.renameFolder( data.path, data.filename, data.newname,function(e) {
				io.emit('renameFolder', {target : data.target, newname : data.newname, rel : data.path+'/'+data.newname, old : data.path+'/'+data.filename})
			})
		})
		socket.on('deleteFile', function(data) {
			file.deleteFile(data.path, function(e) {
				if (e) {
					io.emit('deleteFile', {actor : data.actor, target : data.target})
				};
			});
		})		
		socket.on('deleteFolder', function(data) {
			file.deleteFolder(data.path, function(e) {
				if (e) {
					io.emit('deleteFolder', {target : data.target})
				};
			});
		})
		socket.on('newFile', function(data) {
			file.newFile(data.path, data.name, function(e) {
				if(e){
					io.emit('newFile', 
						{target : data.target, path : data.path})
				}
			})
		})
		
		socket.on('newFolder', function(data) {
			file.newFolder(data.name, data.path, function(e) {
				if(e){
					io.emit('newFolder', 
						{target : data.target, path : data.path})
				}
			})
		})

		socket.on('scan', function(data) {
			project.scan(data.dir, function(a) {
				io.emit('scan',{actor : data.actor, target : data.target, data : a});
			})
		})
    })
	
	app.get('', function(r,s) {
		data = {
			asset : __asset
		}
		s.render('editor', data);
	})
		
	




////////////////////////////////////
	
};

module.exports = Editor;