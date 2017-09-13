console.log("tic");

// token and pickedBy serves the same purpose at the moment

var boardWidth = 3;
var boardArr =[];

var heroToken = "O";
var villainToken = "X";

var heroTurn = true;
var isWon = false;

var displayBoard = function(){
	for (i=0; i<boardWidth; i++){
		var lineStr = "–".repeat(boardWidth);
		var lineObj = [];
		var lineArr = lineStr.split("");
		lineArr.forEach(function(value){
			value = {
				token: "_",
				tilePicked: false,
				pickedBy: ""
				}
				lineObj.push(value);
		})
		boardArr.push(lineObj);
	}
	return boardArr;
}

var playerTurn = function (){ //nested in tilePicked
	if (heroTurn === true){
		return "hero";
	}
	return "villain";
}

var tilePicked = function(row, col){
	boardArr[row][col].tilePicked = true;
	boardArr[row][col].pickedBy = playerTurn();
}



var tokenMatch = function (){
	var j = 1; 
	for(index=0;index<boardArr.length;index++){ 
		if(boardArr[index][0].token === boardArr[index][1].token && boardArr[index][1].token === boardArr[index][2].token){
			return true; //checked each row for horizontal wins
		} else if (boardArr[0][index].token === boardArr[1][index].token && boardArr[1][index].token === boardArr[2][index].token){
			return true; //checked each col for horizontal wins
		} else if (boardArr[j][j].token === boardArr[j-1][j-1].token && boardArr[j][j].token === boardArr[j+1][j+1].token){
			return true; //checked for diagonal wins
		} else if (boardArr[j][j].token === boardArr[j-1][j+1].token && boardArr[j][j].token === boardArr[j+1][j-1].token){
			return true; //checked for diagonal wins
		} else {
			return false;
		}
	}	
}

var tilePickedMatch = function (){
	var j = 1; 
	// debugger
	for(index=0;index<boardArr.length;index++){ 
		if(boardArr[index][0].tilePicked === true && boardArr[index][1].tilePicked === true && boardArr[index][2].tilePicked === true){
			return true; //checked each row for horizontal wins
		} else if (boardArr[0][index].tilePicked === true && boardArr[1][index].tilePicked === true && boardArr[2][index].tilePicked === true){
			return true; //checked each col for horizontal wins
		} else if (boardArr[j][j].tilePicked === true && boardArr[j-1][j-1].tilePicked === true && boardArr[j+1][j+1].tilePicked === true){
			return true; //checked for diagonal wins
		} else if (boardArr[j][j].tilePicked === true && boardArr[j-1][j+1].tilePicked === true && boardArr[j+1][j-1].tilePicked === true){
			return true; //checked for diagonal wins
		} else {
			return false;
		}
	}	
}

var isWon = function(){
	if(tokenMatch()===true &&  tilePickedMatch()===true){
		return true;
	} 
	return false;
}

displayBoard();
//true
// tilePicked(0,0);
// tilePicked(0,1);
// tilePicked(0,2);

//true
// tilePicked(0,2);
// tilePicked(1,2);
// tilePicked(2,2);

//true
// tilePicked(0,0);
// tilePicked(1,1);
// tilePicked(2,2);

// true
// tilePicked(2,0);
// tilePicked(1,1);
// tilePicked(0,2);

//false
// tilePicked(0,1);
// tilePicked(1,1);
// tilePicked(2,2);

console.log (tokenMatch());
console.log (tilePickedMatch());
console.log (isWon());


