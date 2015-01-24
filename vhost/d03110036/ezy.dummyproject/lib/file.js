var File = (function() {
	function File() {};

	File.prototype.readFile = function(path,callback) {
		fs.readFile(path,'utf8', function (err,data) {
			if (err) {
				return callback(err);
			} else {
				return callback(data);
			};
		});
	};

	File.prototype.newFile = function(path,name, callback) {
		fs.writeFile(path+'/'+name,'',function (err) {
			if (err) {
				return callback(err);
			} else {
				return callback(true);
			};
		});
	};

	File.prototype.saveFile = function(path, data,callback) {
		fs.writeFile(path,data,function (err,data) {
			if (err) {
				return callback(err);
			} else {
				return callback(data);
			};
		});	
	};

	File.prototype.renameFile = function(path, filename, newname, callback) {
		fs.rename(path+'/'+filename,path+'/'+newname, function (err) {
			if (err) {
				return callback(err);
			} else{
				return callback(true);
			};
		})		
	};

	File.prototype.deleteFile = function(path, callback) {
		fs.remove(path,function (err) {
			if (err) {
				return callback(err);
			} else {
				return callback(true);
			};
		});	
	};

	File.prototype.newFolder = function(path, parent, callback) {
		if (parent) {
			targetpath = __vhost+'/'+parent+'/'+path;
		} else{
			targetpath = __vhost+'/'+path;
		};
		fs.mkdir(targetpath, function (err) {
			if (err) {
				return callback(err);
			} else {
				return callback(true);
			};
		});	
	};

	File.prototype.deleteFolder = function(path, callback) {
		fs.remove(__vhost+'/'+path, function (err) {
			if (err) {
				return callback(err);
			} else {
				return callback(true);
			};
		})	
	};

	File.prototype.renameFolder = function(path, oldname, newname, callback) {
		fs.move(__vhost+'/'+path+'/'+oldname, __vhost+'/'+path+'/'+newname, function(err) {
            if (err) {
                callback(err);
            } else {
                callback(true);
            };
        })
	};


	return File;
})();

module.exports = File;