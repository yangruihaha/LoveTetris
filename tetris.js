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
	shape_index: 18,
	coordinate: [0,0]
}			
			
var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");

function fillElement(index, coordinate){
	for (var i = 0; i<shape[index].length;i++){
		cxt.fillStyle="#FF0000";
		cxt.fillRect((coordinate[0]+shape[index][i][0])*20,(coordinate[1]+shape[index][i][1])*20,18,18);
	}
}

function clearElement(index, coordinate){
	for (var i = 0; i<shape[index].length;i++){
		cxt.clearRect((coordinate[0]+shape[index][i][0])*20,(coordinate[1]+shape[index][i][1])*20,18,18);
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
	else if(keycode == 40){
		current_element.coordinate[1] = current_element.coordinate[1] + 1;
	}
}

/***
	up-code:	38
	left-code:	37
	down-code:	40
	right-code:	39
*/

$(document).ready(function(event){
	fillElement(current_element.shape_index, current_element.coordinate);
});

$(document).keydown(function(event){ 
    clearElement(current_element.shape_index, current_element.coordinate);
	changeCurrentElement(event.keyCode);
	fillElement(current_element.shape_index, current_element.coordinate);
});
