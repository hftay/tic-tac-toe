# tropical-tic-tac-toe

# H1 Pseudocode
1. create a blank 3x3 gameboard of blank tokens -- each array must be Unique 
		..1. create a winning board for hero with "O" token
		..2. create a winning board for villain "with X" token
2. check which player's turn it is
3. event listener for when tile is clicked
		..1. update content of tile to become current player's token
		..2. update board 
		..3. check if game won by comparing current board with both winning boards
				..*. if true, won either by either horizontal, vertical, leading diagonal, skew diagonal
						..*. display winner (should be current player)
						..*. winner's win-count++
				..*. else,
						..*. switch player turn
						..*. return to step 2

# H1 Data-structure selection 
Considerations 
1) array of array (of objects) -- allows tracking of whether a tile has been picked using array object
		e.g.		Board: [ [{}], [{}], [{}] ]
										where the objects are {token: "playertoken", picked: "true/false"} 
2) array of array (of strings) -- allows easy comparison of array contents
		e.g. 		Board: [ [""], [""], [""] ]

Chose option 2) as a simpler data structure makes it easier to compare game board against winnning boards

# H1 Things yet to do

- fix functionality for increasing/decreasing boardsize?

- CSS; try using active, classList etc

- CSS two different colours for different token

- Research web audio API and add sound effects to your game

- Readability

- Try new things for CSS; 
Practise toggle?

- A readme.md file with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc.

- Allow game customizable options, time limits (TBA), board size (OK), game rounds, name & profiles etc

- Research LocalStorage or SessionStorage to persist data locally to allow games to continue after page refresh or loss of internet connectivity

- Use timers to display "waiting..." messages while users are waiting to be matched


DONE - Keep track of multiple game rounds with a win counter
DONE – Create "Restart Game"
DONE – Incorporate logic for "Draw" situations
DONE – Locked tiles that have already been clicked on!


