var Folder = (function() {
	function Folder() {};

	Folder.prototype.new = function(a,b,c) {
		var data = {
			path : a,
			name : b,
			target : c
		}
		client.emit('newFolder', data);
	};

	Folder.prototype.rename = function(a,b,c,d) {
		var data = {
			path : a,
			newname : b,
			filename : $('#'+c).text(),
			target : c,
			parentid : d
		}
		client.emit('renameFolder', data);
		$('#'+c).text(b);
	};

	Folder.prototype.delete = function(a,b) {
		var data = {
            path: a,
            target: b
        }
        client.emit('deleteFolder', data);
        $('#' + b).remove();
	};

	Folder.prototype.copy = function() {
		
	};

	return Folder;
})()