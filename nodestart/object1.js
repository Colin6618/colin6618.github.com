function Gadget() {
	var name = ['ipod','les'];
	this.getName = function() {
		return name;
	};
}

var toy = new Gadget();
console.log(toy.getName());
var a = toy.getName();
//即使name为私有变量，如果为数组或者对象，仍然可以被改变，因为get方法传递的是引用
a.push('smallcat');
console.log(toy.getName());