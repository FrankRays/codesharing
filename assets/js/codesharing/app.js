var home 	= new Home(),
	user	= new User(),
	kelas	= new Kelas(),
	project	= new Project(),
	base		= "http://localhost/codesharing/";
	user.render();

function Ajax(url, data, type, callback) {
    var datas, types;
    if (data) datas = data;
    if (type) types = type;
    $.ajax({
        url: base + url,
        data: datas,
        type: types,
        success: function(e) {
            if (e) {
                return callback(e);
            }
        }
    })
};