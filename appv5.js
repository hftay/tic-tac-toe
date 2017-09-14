console.log("Tic-Tac-Tropical");

// customisable variables
var boardLength = 3;
var blankToken = " ";
var heroToken = "X";
var villainToken = "O";

// initialise variables
var numMatchesToWin = boardLength;
var heroWinCounter = 0;
var villainWinCounter = 0;
var heroTurn = 1;

var maxMoves = Math.pow(boardLength,2); // for working out draw situations
var numMoves = 0;

var displayBoard = function(tokenType){
	var boardArr =[];
	for (i=0; i<boardLength; i++){
		var lineStr = tokenType.repeat(boardLength);
		var lineArr = lineStr.split("");
		boardArr.push(lineArr);
	}
	return boardArr;
}

var returnPlayerToken = function(){
	if(heroTurn===1){
		playerToken=heroToken;
	} else {
		playerToken=villainToken;
	}
	return playerToken;
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
		}
		if(checkNumsMatchesAchieved(heroCounter,villainCounter)===true){
			console.log("horizontal win");
			return true
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
	var max = boardArr.length-1; // for a 3x3 grid returns 2
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
var body = document.querySelector("body");
var gameBoardDiv = document.querySelector(".game-board");
var displayWinnerDiv = document.querySelector(".display-winner");
var displayPlayerTurnDiv = document.querySelector(".display-player-turn");
var heroWinCounterDiv = document.querySelector(".hero-win-counter");
var villainWinCounterDiv = document.querySelector(".villain-win-counter");
var restartGameDiv = document.querySelector(".restart-game");
var mute = document.querySelector(".mute");

var calculateTileSize = function(){
	var numOfTilesPerRow = boardLength;
	// var widthOfBoard = gameBoardDiv.offsetWidth;
	var widthOfBoard = window.innerHeight*0.45;
	var widthOfEachTile = (widthOfBoard) / numOfTilesPerRow;
	return 0.99999999*widthOfEachTile; // 0.999 to account for padding
}

var generateBlankBoard = function(){
	gameBoardDiv.innerHTML=""; //clear board so it doesn't stack
	
	for (i=0; i<boardLength; i++){
		for(j=0; j<boardLength; j++){
			var tile = document.createElement("div");
			tile.dataset.row= i; 
			tile.dataset.col= j; //creates a data attribute called col
			tile.className = "tile";
			gameBoardDiv.appendChild(tile);
		}
	}
// To  define size of tiles when board length is change, must be placed after generateBoard()
	var gameBoardDivChildrenList = document.querySelectorAll(".tile");
	var widthOfEachTile = calculateTileSize();
	gameBoardDivChildrenList.forEach(function(value){
		value.style.width = widthOfEachTile+"px";
		value.style.height = widthOfEachTile+"px";
		value.style.fontSize = widthOfEachTile+"px";
	})
}

var addPlayerTokenToTile = function(board){
	board[event.target.dataset.row][event.target.dataset.col] = event.target.textContent;
}

var cleanBoardArr = function(board){
	for (row=0; row<boardLength; row++){
		for(col=0; col<boardLength; col++){
			board[row][col] = " ";
		}
	}
}

var resetGameDisplay = function(){
	heroWinCounterDiv.textContent = heroToken + " : " +	heroWinCounter;
	villainWinCounterDiv.textContent = villainToken + " : " + villainWinCounter;
	displayPlayerTurnDiv.textContent = heroToken + " TURN";
	displayWinnerDiv.textContent = "";
}

var makeNewBoard = function(pauseTime){
	cleanBoardArr(boardArr); // this step is requred, otherwise only the DOM game-board is updated
	setTimeout(resetGameDisplay,pauseTime); //
	setTimeout(generateBlankBoard,pauseTime);
	numMoves = 0;
}

var restartGame = function(){
	heroWinCounter=0;
	villainWinCounter=0;
	heroWinCounterDiv.textContent = heroToken + " : " + 	heroWinCounter;
	villainWinCounterDiv.textContent = villainToken + " : " + villainWinCounter;
	makeNewBoard(0);
}

// --------------- Game Event Listeners --------------- 

gameBoardDiv.addEventListener("click", function(event){

	// if tile clicked is empty
	if (event.target.textContent===""){
		event.target.textContent = returnPlayerToken();
		numMoves++;

		stopCelebration();

		click.play();
		addPlayerTokenToTile(boardArr);

		// if game is won
		if(isWon()===true){
			displayPlayerTurnDiv.textContent = "GAME OVER";
			displayWinnerDiv.textContent = returnPlayerToken() + " WINNER!";
			if(returnPlayerToken()===heroToken){
				heroWinCounter++;
				heroWinCounterDiv.textContent = heroToken + " : " + 	heroWinCounter;
				startCelebration();
			} else {
				villainWinCounter++;
				villainWinCounterDiv.textContent = villainToken + " : " + villainWinCounter;
				startCelebration();
			}
		makeNewBoard(2500);
		} 
		// if game is not won, switch player
		else {
			heroTurn = -heroTurn;
			displayPlayerTurnDiv.textContent = returnPlayerToken() + " TURN";
		}
	} 

	// if tile clicked already has content, disable the cell, do not change
	else {
		event.target.textContent = event.target.textContent;
		stopCelebration();
	}
	
	// if draw, make new board
	if(numMoves===maxMoves){
		displayPlayerTurnDiv.textContent = "GAME OVER";
		displayWinnerDiv.textContent = "DRAW!";
		makeNewBoard(2500);
	}

});

restartGameDiv.addEventListener("click",function(){
	restartGame();
})

mute.addEventListener("click", function(event){
	if (event.target.dataset.clicked==="false"){
		backgroundMusic.volume=0;
		event.target.classList.add("unmute"); 
		mute.dataset.clicked = true;
	} else {
		backgroundMusic.volume=1; 
		mute.dataset.clicked = false;
		event.target.classList.remove("unmute"); 
	}
})


// --------------- Audio and Background ---------------  

// audio files 
var backgroundMusic = new Audio('audio/coconut-lounge.mp3');
var click = new Audio('audio/buttonclick.mp3');
var cocoJambo = new Audio('audio/coco-jambo-trim-single.mp3');
var win = new Audio('audio/ta-da.mp3');

// audio ".stop()" function
var stopAudio = function(audio){
	audio.pause();
	audio.currentTime = 0;
}

var startCelebration = function (){
	win.play();
	stopAudio(backgroundMusic);
	cocoJambo.play();
	gameWonBackground();
	setTimeout(resetBackground,9500);
}

var stopCelebration = function(){
	stopAudio(cocoJambo);
	resetBackground();
	backgroundMusic.play();
}

var gameWonBackground = function(){
	body.classList.add("game-won");
}

var resetBackground = function(){
	body.classList.remove("game-won");
}

makeNewBoard(0);
backgroundMusic.play();


