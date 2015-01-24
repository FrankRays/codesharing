var Auth = (function() {
	function Auth() {};

	Auth.prototype.login = function(r,s,id,callback) {
		if (r.cookies.id) {
			return callback(false);
		}else{
			s.cookie('id', id)
			return callback(true);
		};
	};

	Auth.prototype.logout = function(r, s, callback) {
		s.clearCookie('id');
		return callback(true);
	};

	return Auth;
})();

module.exports = Auth;