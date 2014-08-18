var mc2pi = function() {
	var ctx,
		pi,
		inside=0,
		radiusScope=800,
		loopNum = 0,
		totalLoopNum=loopNum;


	var init = function(opt){
		ctx = opt.canvas.getContext('2d');
		// clearTheStatics();
		loopNum = opt.counter;
		ctx.beginPath();
		ctx.rect(0,0,radiusScope,radiusScope);
		ctx.stroke();
		ctx.beginPath(); 
		ctx.arc(0, 0, radiusScope, 0, Math.PI*2, true);
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#000000"; 
		ctx.stroke();
	};

	var drawTheDot = function(j,k){
		ctx.beginPath();
		ctx.fillRect(j,k,1,1);
		ctx.strokeStyle = "#000000"; 
		ctx.stroke();
		// console.log("x:", j, "y:", k);
	};

	var drawTheStatics = function(){

		ctx.font = "Bold 20px Arial"; 
		// 设置对齐方式
		ctx.textAlign = "left";
		// 设置填充颜色
		ctx.fillStyle = "#008600"; 
		// 设置字体内容，以及在画布上的位置
		ctx.fillText("statics: " + inside + "/"+ loopNum, 500, 700);
		// console.log("statics: " + inside + "/"+ loopNum);
		ctx.fillText(inside*4/loopNum, 500, 722);
		// console.log(inside*4/loopNum);

		// 绘制空心字
		// ctx.strokeText("Hello!", 10, 100); 
	};

	var clearTheStatics = function(){

		ctx.font = "Bold 20px Arial"; 
		// 设置对齐方式
		ctx.textAlign = "left";
		// 设置填充颜色
		ctx.fillStyle = "#ffffff"; 
		// 设置字体内容，以及在画布上的位置
		ctx.fillText("statics: " + inside + "/"+ loopNum, 500, 700);
		// console.log("statics: " + inside + "/"+ loopNum);
		ctx.fillText(inside*4/loopNum, 500, 722);
		// console.log(inside*4/loopNum);
		// 绘制空心字
		// ctx.strokeText("Hello!", 10, 100); 
	};
	var calculatePI = function(num){
		var j,k;
		// num = num || 0;
		// loopNum = loopNum + num;
		for (var i = 0; i < loopNum; i++) {
			j = Math.random()*radiusScope,
		 	k = Math.random()*radiusScope;
			if( j + k < radiusScope){
				inside++;
				drawTheDot(j,k);
			}
			else if(j*j + k*k <= radiusScope*radiusScope){
				inside++; 
				drawTheDot(j,k);
			}
			else;
			
		}
		pi = inside*4/loopNum;
		drawTheStatics();
	};



	// mc2pi.prototype.
	return function(opt){
		// var numA = 0.1;
		// var numB = 0.2;
		// alert(numA + numB == 0.3);
		// alert( numA + numB );

		// Math.formatFloat = function(f, digit) {
	 // 	  var m = Math.pow(10, digit);
	 // 	  return parseInt(f * m, 10) / m;
		// }
 
		// var numA = 0.1;
		// var numB = 0.2;
		// alert(Math.formatFloat(numA + numB, 100));
		// console.log(opt);
		init(opt);
		calculatePI(0);

	};
}();
(function(){

	var btn = document.getElementById('cal');
	console.log(btn);
	btn.onclick = function(){
		// alert(1);
		mc2pi({
			canvas:  document.getElementById("myCanvas"),
			counter: document.getElementById("counter").value
		});
	};

	mc2pi({
			canvas:  document.getElementById("myCanvas"),
			counter: 100000000
		});
})();

