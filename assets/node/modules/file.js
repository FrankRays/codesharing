var File = (function() {
    function File() {};
    File.prototype.new = function(a, b, c) {
        data = {
            path: a,
            name: b,
            target: c
        }
        client.emit('newFile', data);
    };
    File.prototype.open = function(a) {
        path = a.target.rel;
        var data = {
            name: name,
            path: path
        }
        client.emit('open', data);
        tab.open(a.target.id, a.target.text, a.target.rel);
    };
    File.prototype.update = function(a) {
        client.emit('update', {
            name: name,
            path: path,
            data: a
        });
    };
    File.prototype.rename = function(a, b, c, d) {
        var data = {
            path: a,
            filename: $('#' + c).text(),
            newname: b,
            actor: name,
            target: c
        }
        client.emit('renameFile', data);
        $('#' + c).text(b);
        file.relpath(c,b);
    };
    File.prototype.relpath = function(a,b) {
    	var oldrel = $('#' + a).attr('rel');
        oldrel = oldrel.split('/');
        oldrel.pop();
        oldrel.push(b);
        var path = oldrel.join('/');
        var id = oldrel.join('/').replace(/\.|\/|\ |\-/g, '')
        $('#' + a).attr('rel',path);
        $('#' + a).attr('id',id);
        tab.renamefile(a,id,b);
    };
    File.prototype.delete = function(a, b) {
        var data = {
            path: a,
            target: b,
            actor: name
        }
        client.emit('deleteFile', data);
        editor.setValue();
        path = "";
        $('#' + b).remove();
        tab.close('tab'+b)
    };
    File.prototype.copy = function() {};
    return File;
})()