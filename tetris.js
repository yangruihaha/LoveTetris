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
				//LShape index:
				[[0,1],[1,1],[2,1],[1,2]],
				[[0,1],[1,1],[2,1],[1,2]],
				[[0,1],[1,1],[2,1],[1,2]],
				[[0,1],[1,1],[2,1],[1,2]],
				[[0,1],[1,1],[2,1],[1,2]]
			];

function fillElement(index, coordinate){
	for (var i = 0; i<shape[index].length;i++){
		var c=document.getElementById("myCanvas");
		var cxt=c.getContext("2d");
		cxt.fillStyle="#FF0000";
		cxt.fillRect((coordinate[0]+shape[index][i][0])*20,(coordinate[1]+shape[index][i][1])*20,18,18);
	}
}

fillElement(0, [0,0])
fillElement(1, [4,0])
fillElement(2, [8,0])
fillElement(3, [12,0])

fillElement(4, [0,4])
fillElement(5, [4,4])
fillElement(6, [8,4])
fillElement(7, [12,4])