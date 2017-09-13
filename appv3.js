console.log("tic-tac-toe");

// 	ATTEMPT ARRAYS of Arrays first: why do you need Objects?  
//	consider breaking down tokenMatch to horizontal match, vertical match, diagonal match
// 	and consider creating winning boards for comparison, will that make it easier of more complicated?

var boardLength = 3;
var numMatchesToWin = boardLength;

var blankToken = " ";
var heroToken = "O";
var villainToken = "X";

var heroTurn = 1;
var isWon = false;

var displayBoard = function(tokenType){
	var boardArr =[];
	for (i=0; i<boardLength; i++){
		var lineStr = tokenType.repeat(boardLength);
		var lineArr = lineStr.split("");
		boardArr.push(lineArr);
	}
	return boardArr;
}

var playerTurn = function(){
	if (heroTurn === 1){
		return "hero";
	}
	return "villain";
}

var tilePicked = function(row, col){
	if (playerTurn() === "hero"){
		boardArr[row][col] = heroToken;
	} else if (playerTurn() === "villain"){
		boardArr[row][col] = villainToken;
	}
}

var checkHorizontalWins = function(){
	for(row=0; row<boardArr.length; row++){
		var heroCounter=0;
		var villainCounter=0;
		for(col=0; col<boardArr.length; col++){
			if(boardArr[row][col] === heroWinBoard[row][col]){
				heroCounter++;
			} else if(boardArr[row][col] === villainWinBoard[row][col]){
				villainCounter++;
			}
		if(heroCounter===numMatchesToWin){
			console.log("hero wins horizontal");
			return true;
			} else if (villainCounter===numMatchesToWin){
			console.log("villain wins horizontal");
			return true;
			} 
		}
	}
	return false;
}

var checkVerticalWins = function(){
	for(col=0; col<boardArr.length; col++){
		var heroCounter=0;
		var villainCounter=0;
		for(row=0; row<boardArr.length; row++){
			if(boardArr[row][col] === heroWinBoard[row][col]){
				heroCounter++;
			} else if(boardArr[row][col] === villainWinBoard[row][col]){
				villainCounter++;
			}
		if(heroCounter===numMatchesToWin){
			console.log("hero wins vertical");
			return true;
			} else if (villainCounter===numMatchesToWin){
			console.log("villain wins vertical");
			return true;
			} 
		}
	}
	return false;
}

var checkLeadingDiagonalWins = function(){
	var heroCounter=0;
	var villainCounter=0;
	for (i=0; i<boardArr.length; i++){
		if(boardArr[i][i] === heroWinBoard[i][i]){
			heroCounter++;
		} else if (boardArr[i][i] === villainWinBoard[i][i]){
			villainCounter++;
		}
	}
	if(heroCounter===numMatchesToWin){
		console.log("hero wins leading diagonal");
		return true;
	} else if (villainCounter===numMatchesToWin){
		console.log("villain wins leading diagonal");
		return true;
	} else {
		return false;
	}
}

var checkSkewDiagonalWins = function(){
	var heroCounter=0;
	var villainCounter=0;
	var max = boardArr.length-1; // for 3x3 grid returns 2
	for(i=0; i<boardArr.length; i++){
		if(boardArr[max-i][i]===heroWinBoard[max-i][i]){
			heroCounter++;
		} else if (boardArr[max-i][i]===villainWinBoard[max-i][i]){
			villainCounter++;
		}
	}
	if(heroCounter===numMatchesToWin){
		console.log("hero wins skew diagonal");
		return true;
	} else if (villainCounter===numMatchesToWin){
		console.log("villain wins skew diagonal");
		return true;
	}
	return false;
}

var isWon = function(){
	if(checkHorizontalWins()===true || checkVerticalWins()===true || checkLeadingDiagonalWins()===true || checkSkewDiagonalWins()===true){
		return true;
	}
	return false;
}



var boardArr = displayBoard(blankToken);
var heroWinBoard = displayBoard(heroToken);
var villainWinBoard = displayBoard (villainToken);

// testArr = [
//  ["O", " ", " ", " ", " "],
//  ["O", "O", " ", " ", " "],
//  ["O", "O", " ", " ", " "],
//  ["X", "O", " ", " ", " "],
//  ["O", "O", " ", " ", " "],
//  ];

// testArr = [
// 	["O", " ", "X"],
// 	[" ", "X", "O"],
// 	["X", "O", "X"]
//  ];
//  boardArr = testArr;
//  console.log(testArr);

// console.log("board array: ", boardArr);
// console.log("hero win board: ", heroWinBoard);
// console.log("villain win board: ", villainWinBoard);

// console.log(checkHorizontalWins());
// console.log(checkVerticalWins());
// console.log(checkLeadingDiagonalWins());
// console.log(checkSkewDiagonalWins());

// console.log(isWon());

// --------------- DOM Related --------------- 
var gameBoardDiv = document.querySelector(".game-board");
// var tile00 = document.querySelector(".tile-00");
// var tile01 = document.querySelector(".tile-01");
// var tile02 = document.querySelector(".tile-02");
// var tile10 = document.querySelector(".tile-10");
// var tile11 = document.querySelector(".tile-11");
// var tile12 = document.querySelector(".tile-12");
// var tile20 = document.querySelector(".tile-20");
// var tile21 = document.querySelector(".tile-21");
// var tile22 = document.querySelector(".tile-22");

// var updateBoard = function(){
// 	tile00.textContent = boardArr[0][0];
// 	tile01.textContent = boardArr[0][1];
// 	tile02.textContent = boardArr[0][2];
// 	tile10.textContent = boardArr[1][0];
// 	tile11.textContent = boardArr[1][1];
// 	tile12.textContent = boardArr[1][2];
// 	tile20.textContent = boardArr[2][0];
// 	tile21.textContent = boardArr[2][1];
// 	tile22.textContent = boardArr[2][2];
// }
// updateBoard();

for (i=0; i<Math.pow(boardArr.length,2);i++){
	var tile = document.createElement("div");
	gameBoardDiv.appendChild(tile);
} 


gameBoardDiv.addEventListener("click",function(event){
	// debugger
	if (playerTurn() === "hero"){
		event.target.textContent = heroToken;
	} else if (playerTurn() === "villain"){
		event.target.textContent = villainToken;
	}
	heroTurn = -heroTurn;
	isWon();
})

