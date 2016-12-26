var selectQuantity;

window.onload = function() {
	var socket = io.connect('http://localhost:3000');

	var seconds = 0;
	var mass = 0;
	var quantities = [200, 300, 400, 500];
	var desired = 200;


	var renderQuantity = function() {
		var view = quantities.map(function(item) {
			return "<div class='option btn " + (desired === item ? "selected" : "") + "' onclick='selectQuantity(" + item + ")'>" + item + " ml</div>"
		}).join("")
		document.getElementById("quantity-list").innerHTML = view;
	}
	selectQuantity = function(quantity) {
		desired = quantity;
		renderQuantity()
		socket.emit('select-quantity', quantity);
	}

	renderQuantity()
}
