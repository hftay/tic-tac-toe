console.log("tic-tac-toe");

var boardLength = 3;
var numMatchesToWin = boardLength;

var blankToken = " ";
var heroToken = "+";
var villainToken = "O";

var heroWinCounter = 0;
var villainWinCounter = 0;

// for working out draw situations
var maxClicks = Math.pow(boardLength,2);
var numClicks =0;

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

var checkNumsMatchesAchieved = function(heroCounter, villainCounter){
	if(heroCounter===numMatchesToWin || villainCounter===numMatchesToWin){
		return true;
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
			if(checkNumsMatchesAchieved(heroCounter,villainCounter)===true){
				console.log("horizontal win");
				return true
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
		}
		if(checkNumsMatchesAchieved(heroCounter,villainCounter)===true){
			console.log("vertical win");
		return true
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
	if(checkNumsMatchesAchieved(heroCounter,villainCounter)===true){
		console.log("leading diagonal win");
		return true
	}
	return false;
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
	if(checkNumsMatchesAchieved(heroCounter,villainCounter)===true){
		console.log("skew diagonal win");
		return true
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

// --------------- DOM Related --------------- 
var gameBoardDiv = document.querySelector(".game-board");
var displayWinnerDiv = document.querySelector(".display-winner");
var displayPlayerTurnDiv = document.querySelector(".display-player-turn");
var heroWinCounterDiv = document.querySelector(".hero-win-counter");
var villainWinCounterDiv = document.querySelector(".villain-win-counter");
var restartGameDiv = document.querySelector(".restart-game");



heroWinCounterDiv.textContent = heroToken + " : " + 	heroWinCounter;
villainWinCounterDiv.textContent = villainToken + " : " + villainWinCounter;

var returnPlayerToken = function(){
	if(playerTurn()==="hero"){
		playerToken=heroToken;
	} else {
		playerToken=villainToken;
	}
	return playerToken;
}

var generateBlankBoard = function(){
	gameBoardDiv.innerHTML=""; //clear board so it doesn't loop
	for (i=0; i<boardLength; i++){
		for(j=0; j<boardLength; j++){
			var tile = document.createElement("div");
			tile.dataset.row= i; 
			tile.dataset.col= j; //creates a data attribute called col
			gameBoardDiv.appendChild(tile);
		}
	}
}


var updateBoard = function(board){
	board[event.target.dataset.row][event.target.dataset.col] = event.target.textContent;
}

var clearBoardArr = function(board){
	for (i=0; i<boardLength; i++){
		for(j=0; j<boardLength; j++){
			board[i][j] = " ";
		}
	}
}

var resetGameDisplay = function(){
	displayPlayerTurnDiv.textContent = heroToken + " TURN";
	displayWinnerDiv.textContent = "";
}



var makeNewBoard = function(){
	var displayTime = 1500 // millisecs
	clearBoardArr(boardArr); // this step is requred, otherwise only the DOM game-board is updated
	setTimeout(resetGameDisplay,displayTime); // wrap these two functions into one.
	setTimeout(generateBlankBoard,displayTime);
	numClicks = 0;
}

var restartGame = function(){
	heroWinCounter=0;
	villainWinCounter=0;
	heroWinCounterDiv.textContent = heroToken + " : " + 	heroWinCounter;
	villainWinCounterDiv.textContent = villainToken + " : " + villainWinCounter;
}

restartGameDiv.addEventListener("click",function(){
	restartGame();
})




generateBlankBoard();
resetGameDisplay();

gameBoardDiv.addEventListener("click",function(event){
	numClicks++;
	console.log("Clicks: " + numClicks);

	// debugger
	if (event.target.textContent===""){
		event.target.textContent = returnPlayerToken();
	} else {
		event.target.textContent = event.target.textContent;
	}

	updateBoard(boardArr);

	if(isWon()===true){
		displayPlayerTurnDiv.textContent = "GAME OVER";
		displayWinnerDiv.textContent = returnPlayerToken() + " WINNER!";
		if(returnPlayerToken()===heroToken){
			heroWinCounter++;
			heroWinCounterDiv.textContent = heroToken + " : " + 	heroWinCounter;
		} else {
			villainWinCounter++;
			villainWinCounterDiv.textContent = villainToken + " : " + villainWinCounter;
		}
		makeNewBoard();

	} else {
		heroTurn = -heroTurn;
		displayPlayerTurnDiv.textContent = returnPlayerToken() + " TURN";
	}

	if(numClicks===maxClicks){
		displayPlayerTurnDiv.textContent = "DRAW, GAME OVER";
		makeNewBoard();
	}

})

// if there is content

