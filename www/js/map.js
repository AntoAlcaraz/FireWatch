var map = {};
map = (function(){

	$(document).delegate('#mapa', 'pagebeforeshow', function() {
		createMap();
	});

	var createMap = function() {
		var map = L.map('map').setView([41.66, -4.72], 15);
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: 'OpenStreetMap',
			maxZoom: 18
		}).addTo(map);

		L.control.scale().addTo(map);
	}

	return {

	}

})();