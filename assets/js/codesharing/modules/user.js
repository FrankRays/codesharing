var User = (function() {
	function User() {};
	User.prototype.render = function() {
		$.post(base+'user/tampil_user', function(data) {
			$('#pagecontent').html(data);
			$('#data_user').dataTable();
		})
	};
	return User;
})()