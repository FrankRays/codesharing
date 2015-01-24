var Home = (function() {
	function Home() {};
	Home.prototype.render = function() {
		$.post( base, function(data) {
		  $('#pagecontent').html(data);
		});
	};
	return Home;
})()