var EasyZip = require('easy-zip').EasyZip, zip = new EasyZip();
var Project = (function() {
    function Project() {};

    Project.prototype.scan = function(dir, cb) {
        var files = fs.readdirSync(dir);
        var folder = [], file = [];
        files.forEach(function(f){
            var ff = dir + f;
            var id = ff.replace(/\.|\/|\ |\-/g, '');
            var stats = fs.statSync(ff)
            if (stats.isDirectory()) { 
                data = {id : id, name : f, rel : ff}
                folder.push(data); 
            } else {
                var ext = f.split('.').pop();
                data = {id : id, name : f, rel : ff, e : ext}
                file.push(data);
            }
        })
        cb({folder : folder, file : file})
    };

    Project.prototype.copyProject = function(oldpath, newpath, callback) {
        fs.copy(__vhost + '/' + oldpath, __vhost + '/' + newpath, function(err) {
            if (err) {
                return callback(err);
            } else {
                return callback(true);
            };
        })
    };
    Project.prototype.createZip = function(path, filename, response) {
        console.log(__vhost + '/' + path);
        zip.zipFolder(__vhost + '/' + path, function() {
            zip.writeToResponse(response, filename + '-master');
        });
    };
    return Project;
})();
module.exports = Project;