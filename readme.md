# Tic-Tac-Tropical

## Objective
* two player take turns to place token on a gameboard (size customisable)
* first player to create a line of their tokens the length of the board wins

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

-DEPLOY

- Research web audio API add sound effects (TBC) to your game – add sound effects to tile hover...
- yet to find a way to stop audio playing 
- options are to either pause or mute audio, but wont achieve effect of audio starting from the beginning.

- Readability

- ux

- fix functionality for increasing/decreasing boardsize?
grid tile creation is buggy, when resizing browser the tiles go crazy, need to refresh a couple of times

- CSS; research Active etc...

- CSS use different colours for different token...

- Try new things for CSS; 
Practise toggle?

- add classlist to winner counter to blink when a game is won

- A readme.md file with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc.

- Allow game customizable options, time limits (TBA), board size (OK), game rounds, name & profiles etc

- Research LocalStorage or SessionStorage to persist data locally to allow games to continue after page refresh or loss of internet connectivity

- Use timers to display "waiting..." messages while users are waiting to be matched


+ DONE - Keep track of multiple game rounds with a win counter
+ DONE – Create "Restart Game"
+ DONE – Incorporate logic for "Draw" situations
+ DONE – Locked tiles that have already been clicked on!
+ DONE – if win, add class to background banana gif



