# Tic-Tac-Tropical

## Objective
* two player take turns to place token on a gameboard
* winner is the first player to create a line of their tokens the length of the board

## Technologies used
* HTML, CSS, Javascript

## Pseudocode
1. create a blank 3x3 gameboard of blank tokens – each array must be Unique  
   1. create a winning board for hero with "O" token  
   2. create a winning board for villain "with X" token  
2. check which player's turn it is  
3. listen for tile clicks and modify the tile  
   1. update content of the tile to become current player's token  
   2. update DOM board  
   3. check if game won by comparing current board against both winning boards  
    * if true, i.e. won either by either horizontal, vertical, leading diagonal, skew diagonal
       * display winner (should be current player)   
       * winner's win-count++   
    * else,   
       * switch player turn   
       * return to step 2

## Data-structure selection 
Considerations  
1. array of array (of objects) -- allows tracking of whether a tile has been picked using array object
* e.g.		Board: [ [{}], [{}], [{}] ]  
* where the objects are {token: "playertoken", picked: "true/false"} 
2. array of array (of strings) -- allows easy comparison of array contents
* e.g. 		Board: [ [""], [""], [""] ]

Chose option 2. as a simpler data structure makes it easier to compare game board against winnning boards

## Things yet to do

- Code Readability

- BUG: grid tile creation is buggy, when resizing browser HEIGHT the tiles go out of sync, refreshing page sometimes fixes the problem but not always... investigate use of media query?

- ux

- Styling for display-winner div to make it more prominent...

- CSS; research CSS pseudo-classes etc...

- CSS use different colours for different token...

- Add classlist to winner's score counter display to blink when a game is won

- Research LocalStorage or SessionStorage to persist data locally to allow games to continue after page refresh or loss of internet connectivity

- Use timers to display "waiting..." messages while users are waiting to be matched

+ DONE – added audio: sound effects to tile click, background music and winner music
+ DONE - Keep track of multiple game rounds with a win counter
+ DONE – Create "Restart Game"
+ DONE – Incorporate logic for "Draw" situations
+ DONE – Locked tiles that have already been clicked on!
+ DONE – if game won, set background to banana dancing gif



