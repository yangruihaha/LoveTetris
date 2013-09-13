var shape = [	//TShape index:0-3
				[[0,1],[1,1],[2,1],[1,2]],
				[[0,1],[1,1],[1,0],[1,2]],
				[[0,1],[1,1],[2,1],[1,0]],
				[[1,0],[1,1],[2,1],[1,2]],
				//JShape index:4-7
				[[1,1],[1,2],[1,3],[2,1]],
				[[0,2],[2,2],[1,2],[2,3]],
				[[1,3],[1,1],[0,3],[1,2]],
				[[0,2],[2,2],[1,2],[0,1]],
				//LShape index:8-11
				[[1,1],[1,2],[1,3],[2,3]],
				[[0,2],[0,3],[1,2],[2,2]],
				[[0,1],[1,1],[1,2],[1,3]],
				[[0,2],[2,1],[1,2],[2,2]],
				//ZShape index:12-13
				[[0,1],[1,1],[1,2],[2,2]],
				[[0,2],[0,3],[1,1],[1,2]],
				//SShape index:14-15
				[[0,2],[1,1],[1,2],[2,1]],
				[[1,1],[1,2],[2,2],[2,3]],
				//IShape index:16-17
				[[0,2],[1,2],[2,2],[3,2]],
				[[2,0],[2,1],[2,2],[2,3]],
				//OShape index:18
				[[1,1],[1,2],[2,1],[2,2]]
			];
			
var current_element = {
	shape_index: 0,
	coordinate: [0,-1]
}			
			
var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");

function fillElement(index, coordinate){
	for (var i = 0; i<shape[index].length;i++){
		cxt.fillStyle="#99FF66";
		cxt.fillRect((coordinate[0]+shape[index][i][0])*20,(coordinate[1]+shape[index][i][1])*20,18,18);
	}
}

function clearElement(index, coordinate){
	for (var i = 0; i<shape[index].length;i++){
		cxt.fillStyle="#666666";
		cxt.fillRect((coordinate[0]+shape[index][i][0])*20,(coordinate[1]+shape[index][i][1])*20,18,18);
	}
}

function mmMatrix(m, mm, xy){
	if(xy == "x" && mm == "min"){
		var min_x = 4; //4 is larger than any coordinate number in a shape
		for (var i = 0; i < m.length; i++)
			if (m[i][0] < min_x)
				min_x = m[i][0];
		return min_x;
	}
	else if (xy == "x" && mm == "max"){
		var max_x = -1;//-1 is larger than any coordinate number in a shape
		for (var i = 0; i < m.length; i++)
			if (m[i][0] > max_x)
				max_x = m[i][0];
		return max_x;
	}
	else if (xy == "y" && mm == "min"){
		var min_y = 4;
		for (var i = 0; i < m.length; i++)
			if (m[i][1] < min_y)
				min_y = m[i][1];
		return min_y;
	}
	else if (xy == "y" && mm == "max"){
		var max_y = -1;
		for (var i = 0; i < m.length; i++)
			if (m[i][1] > max_y)
				max_y = m[i][1];
		return max_y;
	}
}

function changeCurrentElement(keycode){
	if (keycode == 38){
		if(current_element.shape_index >=0 && current_element.shape_index <=11){
			current_element.shape_index = Math.floor(current_element.shape_index/4)*4 + (current_element.shape_index+1)%4;
		}
		else if(current_element.shape_index >=12 && current_element.shape_index <=17){
			if(current_element.shape_index % 2 ==0){
				current_element.shape_index = current_element.shape_index + 1;
			}
			else{
				current_element.shape_index = current_element.shape_index - 1;
			}
		}
	}
	else if(keycode == 40 && mmMatrix(shape[current_element.shape_index], 'max', 'y') + current_element.coordinate[1] + 1 < c.height/20){
		current_element.coordinate[1] = current_element.coordinate[1] + 1;
	}
	else if(keycode == 37 && mmMatrix(shape[current_element.shape_index], 'min', 'x') + current_element.coordinate[0] - 1 >= 0){	//left move
		current_element.coordinate[0] = current_element.coordinate[0] - 1;
	}
	else if(keycode == 39 && mmMatrix(shape[current_element.shape_index], 'max', 'x') + current_element.coordinate[0] + 1 < c.width/20 ){	//right move	
		current_element.coordinate[0] = current_element.coordinate[0] + 1;
	}
}

/***
	up-code:	38
	left-code:	37
	down-code:	40
	right-code:	39
*/

$(document).ready(function(event){
	document.body.style.overflow="hidden"; //锁定滚动条
	cxt.fillStyle="#666666";
	cxt.fillRect(0,0,c.width,c.height);
		
	fillElement(current_element.shape_index, current_element.coordinate);
	setInterval("clearElement(current_element.shape_index, current_element.coordinate)", 1000);
	setInterval("changeCurrentElement(40)", 1000);
	setInterval("fillElement(current_element.shape_index, current_element.coordinate)", 1000);
});

$(document).keydown(function(event){ 
    clearElement(current_element.shape_index, current_element.coordinate);
	changeCurrentElement(event.keyCode);
	fillElement(current_element.shape_index, current_element.coordinate);
});
