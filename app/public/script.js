var selectQuantity;

window.onload = function() {
	var socket = io.connect();

	var quantities = [200, 300, 400, 500];

	var renderQuantity = function(desired) {
		return quantities.map(function(item) {
			return "<div class='option btn " + (desired === item ? "selected" : "") + "' onclick='selectQuantity(" + item + ")'>" + item + " ml</div>"
		}).join("")
	}
	var renderSelectPage = function(desired) {
		var view = "<p>How much coffee you want?</p>";
		view += "<div id='quantity-list' class='list'>";
		view += renderQuantity(desired);
		view += "</div><div class='ok-btn btn' onclick='start()'>Make Coffee!</div>";
		return view;
	}
	var renderRunPage = function(mass, desired) {
		var percent = Math.floor(mass * 100 / desired);
		var view = "<p>Making your coffee...</p>";
		view += "<div class='bar-container'><div class='bar' style='width:" + percent + "%;'></div></div>";
		return view;
	}
	var renderBusyPage = function() {
		return "<p>Device is occupied by other user.</p>";
	}
	selectQuantity = function(quantity) {
		socket.emit('desired', quantity);
	}
	start = function() {
		socket.emit('start');
	}

	socket.on('state', function(data) {
		var view = "";

		if (data.success) {
			if (data.running) {
				view = renderRunPage(data.mass, data.desired);
			} else {
				var desired = data.desired;
				view = renderSelectPage(desired);
			}
		} else {
			view = renderBusyPage();
		}
		document.getElementById("content").innerHTML = view;
	});
}
