var myobj = (function(){

	var privatenum = ['ipod', 'les'];
	return {
		getNum: function(){
			return privatenum;
		}
	}
}());

console.log(myobj.getNum());
var a = myobj.getNum();
a.push('smallcat');
console.log(myobj.getNum());
console.log('====');

function test() {
	var x = 2;
	console.log(this.x);
}

var x = 3;
(function ttt(){
	var o = {};
	o.x = 1;
	o.m = test;
	o.m();
}());

//this总是指向调用function的那个对象

