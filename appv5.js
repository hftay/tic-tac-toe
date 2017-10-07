console.log("Tic-Tac-Tropical");

// kasun feedback: minimise global variables where possible
// mission to remove global variables
var customisableVars = {
	boardLength: 3,
	boardvhRatio: 0.45,
	blankToken: " ",
	heroToken: "X",
	villainToken: "O"
}

// customisable variables
var boardLength = 3;
var boardvhRatio = 0.45;
var blankToken = " ";
var heroToken = "X";
var villainToken = "O";

// initialise variables
var numTokensToWinPerRow = boardLength;
var heroWinCounter = 0;
var villainWinCounter = 0;
var heroTurn = 1;
var maxMoves = Math.pow(boardLength,2); // for working out draw situations
var numMoves = 0;

var generateBoardArr = function(tokenType){
	var boardArr =[];
	for (i=0; i<boardLength; i++){
		var lineStr = tokenType.repeat(boardLength);
		var lineArr = lineStr.split("");
		boardArr.push(lineArr);
	}
	return boardArr;
}

var boardArr = generateBoardArr(blankToken);
var heroWinBoard = generateBoardArr(heroToken);
var villainWinBoard = generateBoardArr (villainToken);

// --------------- JS Related Functions --------------- 

var currentPlayerToken = function(){
	if(heroTurn===1){
		playerToken=heroToken;
	} else {
		playerToken=villainToken;
	}
	return playerToken;
}

var checkEnoughTokensForWin = function(heroTokenCount, villainTokenCount){
	if(heroTokenCount===numTokensToWinPerRow || villainTokenCount===numTokensToWinPerRow){
		return true;
	}
}

var checkHorizontalWins = function(){
	for(row=0; row<boardArr.length; row++){ //hold row constant, check each col elem
		var heroTokenCount=0;
		var villainTokenCount=0;
		for(col=0; col<boardArr.length; col++){
			if(boardArr[row][col] === heroWinBoard[row][col]){
				heroTokenCount++;
			} else if(boardArr[row][col] === villainWinBoard[row][col]){
				villainTokenCount++;
			}
		}
		if(checkEnoughTokensForWin(heroTokenCount,villainTokenCount)===true){
			console.log("horizontal win");
			return true
		}
	}
	return false;
}

var checkVerticalWins = function(){
	for(col=0; col<boardArr.length; col++){ //hold col constant, check each row elem
		var heroTokenCount=0;
		var villainTokenCount=0;
		for(row=0; row<boardArr.length; row++){
			if(boardArr[row][col] === heroWinBoard[row][col]){
				heroTokenCount++;
			} else if(boardArr[row][col] === villainWinBoard[row][col]){
				villainTokenCount++;
			}
		}
		if(checkEnoughTokensForWin(heroTokenCount,villainTokenCount)===true){
			console.log("vertical win");
			return true
		}
	}
	return false;
}

var checkLeadingDiagonalWins = function(){
	var heroTokenCount=0;
	var villainTokenCount=0;
	for (i=0; i<boardArr.length; i++){
		if(boardArr[i][i] === heroWinBoard[i][i]){
			heroTokenCount++;
		} else if (boardArr[i][i] === villainWinBoard[i][i]){
			villainTokenCount++;
		}
	}
	if(checkEnoughTokensForWin(heroTokenCount,villainTokenCount)===true){
		console.log("leading diagonal win");
		return true
	}
	return false;
}

var checkSkewDiagonalWins = function(){
	var heroTokenCount=0;
	var villainTokenCount=0;
	var maxArrayIndex = boardArr.length-1; // for a 3x3 grid returns 2
	for(i=0; i<boardArr.length; i++){
		if(boardArr[maxArrayIndex-i][i]===heroWinBoard[maxArrayIndex-i][i]){
			heroTokenCount++;
		} else if (boardArr[maxArrayIndex-i][i]===villainWinBoard[maxArrayIndex-i][i]){
			villainTokenCount++;
		}
	}
	if(checkEnoughTokensForWin(heroTokenCount,villainTokenCount)===true){
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

// --------------- DOM Related Functions --------------- 

// kasun feedback: minimise global variables where possible
// minimise global variables BY creating a dom object and passing them into functions like so:
var doms = {
	body: document.querySelector("body"),
	gameBoardDiv: document.querySelector(".game-board"),
	displayWinnerDiv: document.querySelector(".display-winner"),
	displayPlayerTurnDiv: document.querySelector(".display-player-turn"),
	heroWinCounterDiv: document.querySelector(".hero-win-counter"),
	villainWinCounterDiv: document.querySelector(".villain-win-counter"),
	restartGameDiv: document.querySelector(".restart-game"),
	mute: document.querySelector(".mute"),
	increaseBoardSize: document.querySelector(".increase-board-size"),
	decreaseBoardSize: document.querySelector(".decrease-board-size")
}; // then pass it into the individual functions for use e.g. resetGameDisplay = function(doms.heroWinCounterDiv)

var body = document.querySelector("body");
var gameBoardDiv = document.querySelector(".game-board");
var displayWinnerDiv = document.querySelector(".display-winner");
var displayPlayerTurnDiv = document.querySelector(".display-player-turn");
var heroWinCounterDiv = document.querySelector(".hero-win-counter");
var villainWinCounterDiv = document.querySelector(".villain-win-counter");
var restartGameDiv = document.querySelector(".restart-game");
var mute = document.querySelector(".mute");
var increaseBoardSize = document.querySelector(".increase-board-size");
var decreaseBoardSize = document.querySelector(".decrease-board-size");

var makeNewBoard = function(pauseDuration){
	emptyBoardArr(boardArr); // this step is required, otherwise only the DOM game-board is updated
	setTimeout(resetGameDisplay,pauseDuration); //
	setTimeout(generateBlankDomBoard,pauseDuration);
	numMoves = 0;
}

var emptyBoardArr = function(board){
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

var calcBoardTileSize = function(){
	var numOfTilesPerRow = boardLength;
	// var widthOfBoard = gameBoardDiv.offsetWidth;
	var widthOfBoard = window.innerHeight*boardvhRatio;
	var widthOfEachBoardTile = (widthOfBoard) / numOfTilesPerRow;
	return widthOfEachBoardTile;
}

var generateBlankDomBoard = function(){
	gameBoardDiv.innerHTML=""; //clear board so it doesn't stack
	
	// generate x number of div tiles depending on board size
	for (boardTileRow=0; boardTileRow<boardLength; boardTileRow++){
		for(boardTileCol=0; boardTileCol<boardLength; boardTileCol++){
			var tile = document.createElement("div");
			tile.dataset.row= boardTileRow; //creates a data attribute called row
			tile.dataset.col= boardTileCol; //creates a data attribute called col
			tile.className = "tile";
			gameBoardDiv.appendChild(tile);
		}
	}
	// to set tile width, must be placed after generateBoard()
	var gameBoardDivChildrenList = document.querySelectorAll(".tile");
	var widthOfEachBoardTile = calcBoardTileSize();
	gameBoardDivChildrenList.forEach(function(value){
		value.style.width = widthOfEachBoardTile+"px";
		value.style.height = widthOfEachBoardTile+"px";
		value.style.fontSize = widthOfEachBoardTile+"px";
	})
}

var addPlayerTokenToTile = function(board){
	board[event.target.dataset.row][event.target.dataset.col] = event.target.textContent;
}

var reinitialiseGlobalVars = function (){
	boardArr = generateBoardArr(blankToken);
	heroWinBoard = generateBoardArr(heroToken);
	villainWinBoard = generateBoardArr (villainToken);
	numTokensToWinPerRow = boardLength;
	heroTurn = 1;
	maxMoves = Math.pow(boardLength,2);
	numMoves = 0;
}

// --------------- Game Event Listeners --------------- 


// kasun feedback: create a higher level function that encapsulates the smaller functions to make your code more readable
gameBoardDiv.addEventListener("click", function(event){
	stopCelebration();

	if (event.target.textContent===""){ // only proceed if tile clicked is empty of content
		click.play();
		event.target.textContent = currentPlayerToken();
		addPlayerTokenToTile(boardArr);
		numMoves++;

		if(isWon()===true){ // if game is won
			startCelebration();
			displayWinnerDiv.textContent = currentPlayerToken() + " WINNER!";
			makeNewBoard(2500);
			displayPlayerTurnDiv.textContent = "GAME OVER";

			if(currentPlayerToken()===heroToken){
				heroWinCounter++;
				heroWinCounterDiv.textContent = heroToken + " : " + heroWinCounter;
			} else {
				villainWinCounter++;
				villainWinCounterDiv.textContent = villainToken + " : " + villainWinCounter;
			}
		} 
		else if (numMoves===maxMoves) { // check draw, make new board
			displayPlayerTurnDiv.textContent = "GAME OVER";
			displayWinnerDiv.textContent = "DRAW!";
			makeNewBoard(2500);
		}		
		else { // if game is not won and not draw, switch player
			heroTurn = -heroTurn;
			displayPlayerTurnDiv.textContent = currentPlayerToken() + " TURN";
		}
	} 
});

restartGameDiv.addEventListener("click",function(){
	click.play();
	stopCelebration();
	makeNewBoard(0);
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

increaseBoardSize.addEventListener("click", function(){
	if(boardLength<9){
		click.play();
		boardLength++;
		reinitialiseGlobalVars();
		makeNewBoard();
	}
})

decreaseBoardSize.addEventListener("click", function(){
	if(boardLength>2){
		click.play();
		boardLength--;
		reinitialiseGlobalVars();
		makeNewBoard();
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
	displayGameWonBackground();
	setTimeout(resetBackground,9500);
}

var stopCelebration = function(){
	stopAudio(cocoJambo);
	resetBackground();
	backgroundMusic.play();
}

var displayGameWonBackground = function(){
	body.classList.add("game-won");
}

var resetBackground = function(){
	body.classList.remove("game-won");
}

makeNewBoard(0);
backgroundMusic.play();


