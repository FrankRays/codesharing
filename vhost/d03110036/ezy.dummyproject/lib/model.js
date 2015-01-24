var Model = (function() {
	function Model() {};

	Model.prototype.add = function(r, table, param, callback) {
		r.getConnection(function (err, connection) {
			var query = connection.query("INSERT INTO "+table+" set ?",[param], function(err, rows){
				if (err) {
					return callback(err);
				}
				return callback(null, rows);
			});
		}) 
	};

	Model.prototype.get = function(r, table, param, callback) {
		r.getConnection(function (err, connection) {
			var query = connection.query("SELECT * FROM "+table+" where ?",[param], function(err, rows){
				if (err) {
					return callback(err);
				} 
				return callback(null, rows);
			});
		}) 	
	};

	Model.prototype.update = function(r, table, param, id, callback) {
		r.getConnection(function (err, connection) {
			var query = connection.query("UPDATE "+table+" set ? where ?",[param,id], function(err, rows){
				if (err) {
					return callback(err);
				} 
				return callback(null, true);
			});
		}) 
	};

	Model.prototype.delete = function(r, table, id, callback) {
		r.getConnection(function (err, connection) {
			var query = connection.query("DELETE FROM "+table+" where ?",[id], function(err, rows){
				if (err) {
					return callback(err);
				} 
				return callback(null, true);
			});
		})
	};

	return Model;
})();

module.exports = Model;