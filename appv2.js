console.log("tic");

// token and pickedBy serves the same purpose at the moment

var boardWidth = 3;
var boardArr =[];
var heroWinBoard = [];
var villainWinBoard = [];


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
				tilePicked: false
				}
				lineObj.push(value);
		})
		boardArr.push(lineObj);
	}
	return boardArr;
}

var generateHeroWinBoard = function(){
	for (i=0; i<boardWidth; i++){
		var lineStr = "O".repeat(boardWidth);
		var lineObj = [];
		var lineArr = lineStr.split("");
		lineArr.forEach(function(value){
			value = {
				token: "O",
				tilePicked: true
				}
				lineObj.push(value);
		})
		heroWinBoard.push(lineObj);
	}
	return heroWinBoard;
}

var generateVillainWinBoard = function(){
	for (i=0; i<boardWidth; i++){
		var lineStr = "X".repeat(boardWidth);
		var lineObj = [];
		var lineArr = lineStr.split("");
		lineArr.forEach(function(value){
			value = {
				token: "X",
				tilePicked: true
				}
				lineObj.push(value);
		})
		villainWinBoard.push(lineObj);
	}
	return villainWinBoard;
}

var playerTurn = function (){ //nested in tilePicked
	if (heroTurn === true){
		return "hero";
	}
	return "villain";
}

var tilePicked = function(row, col){
	
	boardArr[row][col].tilePicked = true;
	if(playerTurn()==="hero"){
		boardArr[row][col].token = heroToken;
	} else if (playerTurn()==="villain"){
		boardArr[row][col].token = villainToken;
	}
}

var pointsToWin = boardArr.length;

// consider comparing current board to win conditions...

// win = horizontal true, vertical true, diagonal true

var checkVerticalWin = function(){}


var isWon = function(){
	if(tokenMatch()===true &&  tilePickedMatch()===true){
		return true;
	} 
	return false;
}

generateVillainWinBoard();
generateHeroWinBoard();
displayBoard();
//true
tilePicked(0,0);
tilePicked(0,1);
tilePicked(0,2);

checkHorizontalWin();


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

// console.log (tokenMatch());
// console.log (tilePickedMatch());
// console.log (isWon());


