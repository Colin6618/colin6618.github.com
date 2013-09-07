(function (wdw,dmt){
	var TETRIS_ROWS = 20;
	var TETRIS_COLS = 14;
	var CELL_SIZE = 24;
	var tetris_canvas;
	var tetris_ctx;
	// 记录当前积分
	var curScore = 0;
	// 记录当前速度
	var curSpeed = 1;
	// 记录曾经的最高积分
	var maxScore = 0;
	var curScoreEle , curSpeedEle , maxScoreEle;
	var curTimer;
	// 记录当前是否游戏中的旗标
	var isPlaying = true;
	// 记录正在下掉的四个方块
	var currentFall;
	// 该数组用于记录底下已经固定下来的方块。
	var tetris_status = [];
	// 没方块是0用于充值方块数组元素
	var NO_BLOCK = 0;
	// 定义方块的颜色
	var colors = ["#fff", "#f00" , "#0f0" , "#00f"
	, "#c60" , "#f0f" , "#0ff" , "#609"];
	var createCanvus = function(opt){
		var opt = opt || {
			rows: TETRIS_ROWS,
			cols: TETRIS_COLS,
			cell_size: CELL_SIZE 
		}
		// console.log(opt);
		//供全局调用更加方便
		TETRIS_ROWS = opt.rows;
		TETRIS_COLS = opt.cols;
		CELL_SIZE = opt.cell_size;

		tetris_canvas = dmt.createElement("canvas");
		tetris_canvas.width = opt.cols * opt.cell_size;
		tetris_canvas.height = opt.rows * opt.cell_size;
		tetris_canvas.style.border = "1px solid black";
		tetris_ctx = tetris_canvas.getContext("2d");
		tetris_ctx.beginPath();
		// 开始画游戏界面
		//横线
		for(var i = 1; i < opt.rows ; i++){
			tetris_ctx.moveTo(0, i * opt.cell_size);
			tetris_ctx.lineTo(opt.cols * opt.cell_size, i * opt.cell_size);
		}
		//竖线
		for(var i = 1; i < opt.cols+1 ; i++){//cols+1解决最右一根竖线偏粗的问题
			tetris_ctx.moveTo(i * opt.cell_size , 0);
			tetris_ctx.lineTo(i * opt.cell_size , opt.rows * opt.cell_size);
		}

		tetris_ctx.closePath();
		tetris_ctx.strokeStyle = "#555";
		tetris_ctx.lineWidth = 0.2;
		tetris_ctx.stroke();

		// 初始化每个方格
		for(var i = 0; i < TETRIS_ROWS; i++){
			tetris_status[i] = [];
			for(var j = 0; j< TETRIS_COLS; j++){
				tetris_status[i][j] = NO_BLOCK;
			}
		}
	}//end of createCanvus


	var blockArr = [
	//Z
	{
		x : [TETRIS_COLS / 2 -1, TETRIS_COLS / 2, TETRIS_COLS / 2, TETRIS_COLS / 2 + 1],
		y : [0, 0, 1, 1],
		color: [1,1,1,1]
	},
	//反Z
	{
		x : [TETRIS_COLS / 2 + 1, TETRIS_COLS / 2, TETRIS_COLS / 2, TETRIS_COLS / 2 - 1],
		y : [0, 0, 1, 1],
		color: [2,2,2,2]		
	},
//田
	{
		x : [TETRIS_COLS / 2 - 1, TETRIS_COLS / 2, TETRIS_COLS / 2 - 1, TETRIS_COLS / 2 ],
		y : [0, 0, 1, 1],
		color: [3,3,3,3]		
	},
//L
	{
		x : [TETRIS_COLS / 2 - 1, TETRIS_COLS / 2-1, TETRIS_COLS / 2 - 1, TETRIS_COLS / 2 ],
		y : [0, 1, 2, 2],
		color: [4,4,4,4]		
	},
//镜面L
	{
		x : [TETRIS_COLS / 2 , TETRIS_COLS / 2, TETRIS_COLS / 2 , TETRIS_COLS / 2-1 ],
		y : [0, 1, 2, 2 ],
		color: [5,5,5,5]		
	},
//I
	{
		x : [TETRIS_COLS / 2 , TETRIS_COLS / 2, TETRIS_COLS / 2 , TETRIS_COLS / 2 ],
		y : [0, 1, 2, 3],
		color: [6,6,6,6]		
	},
//┻
	{
		x : [TETRIS_COLS / 2 , TETRIS_COLS / 2 - 1, TETRIS_COLS / 2 , TETRIS_COLS / 2 + 1],
		y : [0, 1, 1, 1],
		color: [7,7,7,7]		
	}]

//产生下一个方块
	var initBlock = function() {
		var rand = Math.floor(Math.random() * blockArr.length);
		currentFall = blockArr[rand];
		
		for(var i = 0; i < currentFall.x.length ; i++){
			tetris_status[currentFall.y[i]][currentFall.x[i]] = currentFall.color[i];
		}
		console.log(tetris_status);
	};
//绘制俄罗斯方块
	var drawBlock = function(){
		for(var i = 0; i < TETRIS_ROWS ; i++){
			for(var j = 0; j < TETRIS_COLS; j++){
				if(tetris_status[i][j] != NO_BLOCK){
					/*tetris_ctx.shadowBlur=10;
					tetris_ctx.shadowColor=colors[tetris_status[i][j]];*/
					tetris_ctx.fillStyle = colors[tetris_status[i][j]];
					//写成这样了tetris_ctx.fillRect = ( j * CELL_SIZE +1 , i * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);控制台不会报错
					//花了半个下午怎么也调不出来哪里出错，第二天发现这个错误真是啼笑皆非！
					tetris_ctx.fillRect( j * CELL_SIZE +1 , i * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
				}
				else{
					/*tetris_ctx.shadowBlur=0;
					tetris_ctx.shadowColor="black";*/
					tetris_ctx.fillStyle = "white";
					tetris_ctx.fillRect( j * CELL_SIZE +1 , i * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);		
				}
			}
		}
	};
//接受一个blockArr对象元素，涂成colorToPaint颜色
var paintBlock = function(blockToPaint, colorToPaint){
	for(var i = 0; i< blockToPaint.x.length; i++){

		tetris_ctx.fillStyle = colorToPaint;
		// 绘制矩形
		tetris_ctx.fillRect(blockToPaint.x[i] * CELL_SIZE + 1 
			, blockToPaint.y[i] * CELL_SIZE + 1 , CELL_SIZE - 2 , CELL_SIZE - 2);
	}
}
// 控制方块向下掉。
var moveDown  = function(){
	// 定义能否下掉的旗标
	// alert("tofall");
	var canFall = true;    //①
	// 遍历每个方块，判断是否能向下掉
	/*for(var i = 0; i < currentFall.y.length; i++){
		if(currentFall.y[i]  >= TETRIS_ROWS - 1){//最底下
			canFall = false;
			break;
		}
		else if(tetris_status[currentFall.y[i] + 1][currentFall.x[i] != NO_BLOCK){//下面有方块
			canFall = false;
			break;
		}
		else ;
	}*/

	if(canFall){
		//原方块涂成背景色；
		paintBlock(currentFall, "white");
		//y值+1
		for (var i = currentFall.y.length - 1; i >= 0; i--) {
			currentFall.y[i] += 1; 
		};
		paintBlock(currentFall, colors[currentFall.color[0]]);
	}
	wdw.setTimeout(moveDown,  500 / curSpeed);
};
	/*main*/
window.onload = function(){
	createCanvus();
	dmt.getElementById("Tetrisdiv").appendChild(tetris_canvas);
	initBlock();
	drawBlock();
	wdw.setTimeout(moveDown,  500 / curSpeed);
	/*end of main*/
}
}(window,document))