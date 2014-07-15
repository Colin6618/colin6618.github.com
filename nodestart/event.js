var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

event.on('some_event', function () {
	var num = 1;
	console.log('some event happened' + num);
});
setTimeout(function () {
	event.emit('some_event');
}, 1000);