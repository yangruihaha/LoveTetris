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
	shape_index: Math.round(18*Math.random()),
	coordinate: [0,-1]
}		
			
var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");

/* to record the element has fallen */
var occupancy = new Array();
for(var i=0; i<c.width/20; i++){
	occupancy[i] = new Array();
	for(var j=0; j<c.height/20; j++){
		occupancy[i][j] = 0;
	}
}

function fillElement(index, coordinate, color){
	for (var i = 0; i<shape[index].length;i++){
		//cxt.fillStyle="#99FF66";
		cxt.fillStyle=color;
		cxt.fillRect((coordinate[0]+shape[index][i][0])*20,(coordinate[1]+shape[index][i][1])*20,18,18);
	}
}

function fillOccupancy(index, coordinate, color){
	for (var i = 0; i<shape[index].length;i++){
		//cxt.fillStyle="#99FF66";
		occupancy[coordinate[0]+shape[index][i][0]][coordinate[1]+shape[index][i][1]] = 1;
	}
	for (var i = 0; i<occupancy.length;i++){
		for (var j = 0; j<occupancy[i].length;j++){
			cxt.fillStyle=color;
			if(occupancy[i][j] == 1){
				cxt.fillRect(i*20, j*20,18,18);
			}
		}
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

function collisionCheck(index, coordinate, direct){
	for (var i = 0; i<shape[index].length;i++){
		if(direct == "down"){
			if(occupancy[coordinate[0]+shape[index][i][0]][coordinate[1]+shape[index][i][1]+1] == 1){
				return true;
			}
		}
		else if(direct == "left"){
			if(occupancy[coordinate[0]+shape[index][i][0]-1][coordinate[1]+shape[index][i][1]] == 1){
				return true;
			}
		}
		else if(direct == "right"){
			if(occupancy[coordinate[0]+shape[index][i][0]+1][coordinate[1]+shape[index][i][1]] == 1){
				return true;
			}
		}
		else if(direct == "shape_change"){
			if(occupancy[coordinate[0]+shape[index][i][0]][coordinate[1]+shape[index][i][1]] == 1){
				return true;
			}
		}
	}
	return false;
}

function eraseLine(line){
	cxt.fillStyle="#666666";
	cxt.fillRect(0,line*20,c.width,20);

	for(var j=line; j>=0; j--){
		for(var i=0; i<occupancy.length; i++){
			if(j > 0){
				occupancy[i][j] = occupancy[i][j-1];
			}
			else{
				occupancy[i][j] = 0;
			}
		}
	}
	for (var i = 0; i<occupancy.length;i++){
		for (var j = 0; j<occupancy[i].length;j++){
			if(occupancy[i][j] == 1){
				cxt.fillStyle='#868866';
				cxt.fillRect(i*20, j*20,18,18);
			}
			else{
				cxt.fillStyle='#666666';
				cxt.fillRect(i*20, j*20,18,18);
			}
		}
	}
}

function erase(){
	for(var j =0; j<occupancy[0].length; j++){
		for(var i=0; i<occupancy.length; i++){
			if(occupancy[i][j] == 0){
				break;
			}
		}
		if( i == occupancy.length){
			eraseLine(j);
		}
	}
}

function allCheck(index, coordinate){
	return	mmMatrix(shape[index], 'max', 'y') + coordinate[1] < c.height/20 &&
			mmMatrix(shape[index], 'min', 'x') + coordinate[0] >= 0 &&
			mmMatrix(shape[index], 'max', 'x') + coordinate[0] < c.width/20 &&
			!collisionCheck(index, coordinate, 'shape_change');
}


function changeCurrentElement(keycode){
	if (keycode == 38){
		if(current_element.shape_index >=0 && current_element.shape_index <=11){
			//current_element.shape_index = Math.floor(current_element.shape_index/4)*4 + (current_element.shape_index+1)%4;
			temp_index = Math.floor(current_element.shape_index/4)*4 + (current_element.shape_index+1)%4;
			if(allCheck(temp_index, current_element.coordinate)){
				current_element.shape_index = temp_index;
			}
		}
		else if(current_element.shape_index >=12 && current_element.shape_index <=17){
			if(current_element.shape_index % 2 ==0){
				temp_index = current_element.shape_index + 1;
				if(allCheck(temp_index, current_element.coordinate)){
					current_element.shape_index = temp_index;
				}
			}
			else{
				temp_index = current_element.shape_index - 1;
				if(allCheck(temp_index, current_element.coordinate)){
					current_element.shape_index = temp_index;
				}
			}
		}
	}
	else if(keycode == 40 && mmMatrix(shape[current_element.shape_index], 'max', 'y') + current_element.coordinate[1] + 1 < c.height/20 &&
			!collisionCheck(current_element.shape_index, current_element.coordinate, 'down') ){
		current_element.coordinate[1] = current_element.coordinate[1] + 1;
	}
	else if(keycode == 37 && mmMatrix(shape[current_element.shape_index], 'min', 'x') + current_element.coordinate[0] - 1 >= 0 &&
			!collisionCheck(current_element.shape_index, current_element.coordinate, 'left') ){	//left move
		current_element.coordinate[0] = current_element.coordinate[0] - 1;
	}
	else if(keycode == 39 && mmMatrix(shape[current_element.shape_index], 'max', 'x') + current_element.coordinate[0] + 1 < c.width/20 &&
			!collisionCheck(current_element.shape_index, current_element.coordinate, 'right') ){	//right move	
		current_element.coordinate[0] = current_element.coordinate[0] + 1;
	}
	else if(mmMatrix(shape[current_element.shape_index], 'max', 'y') + current_element.coordinate[1] >= c.height/20 - 1 ||
			collisionCheck(current_element.shape_index, current_element.coordinate, 'down')){
		fillOccupancy(current_element.shape_index, current_element.coordinate,'#868866');
		erase();

		current_element.shape_index = Math.round(18*Math.random());
		current_element.coordinate[0] = 0;
		current_element.coordinate[1] = -1;
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
	setInterval("fillElement(current_element.shape_index, current_element.coordinate,'#666666')", 1000);
	setInterval("changeCurrentElement(40)", 1000);
	setInterval("fillElement(current_element.shape_index, current_element.coordinate,'#99FF66')", 1000);
});

$(document).keydown(function(event){ 
    fillElement(current_element.shape_index, current_element.coordinate,'#666666');
	changeCurrentElement(event.keyCode);
	fillElement(current_element.shape_index, current_element.coordinate,'#99FF66');
});
