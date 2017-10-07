## GA Week 3:  
Project #1: The Game  
Project timeframe: 3.5 days  

### Game Objective
* two player take turns to place their token on a gameboard
* first player to create a row of tokens the length of the board wins
* size of gameboard customisable in browser

**Link to app:** [Tropicoe](https://hftay.github.io/tic-tac-toe/)

### Pseudocode 
1. create a blank 3x3 gameboard of blank tokens  
   1. create a winning board for hero for comparison against game board  
   2. create a winning board for villain for comparison against game board  
2. check which player's turn it is and which token to place on game board 
3. event listener for tile clicks 
   1. update DOM board i.e. update content of the tile clicked to display current player's token  
   2. update the console board array with the same info
   3. check if game won by comparing current console board against hero & villain winning boards  
    ** if true, i.e. won either by either horizontal, vertical, leading diagonal, skew diagonal
       * display winner   
       * winner's win-count++   
    ** else,   
       * switch player turn   
       * return to step 2

Technical Requirement:
- Render a game in the browser
- Switch turns between more than one player
- Design logic for winning & visually display which player won
- Include separate HTML / CSS / JavaScript files
- Stick with KISS (Keep It Simple Stupid) principles
- Use Javascript for DOM manipulation
- Deploy your game online, where the rest of the world can access it
- Use semantic markup for HTML and CSS (adhere to best practices)

Tech used:
* HTML5, CSS3, Javascript

Things yet to do  
- Fix bugs:
  - Display is buggy when viewed using phone browser
  - Resizing browser Height causes board tiles to go wonky (due to vh being used?), refreshing page sometimes fixes the problem, but not always... investigate use of media query?
- Improve UX
  - CSS use different colours for different token...
  - CSS: Styling for display-winner div to make it more prominent...
  - Add classlist to winner's score counter display to blink when a game is won
- Research LocalStorage or SessionStorage to persist data locally to allow games to continue after page refresh or loss of internet connectivity
– Add functionality for playing against computer player  
+ DONE – added feature to allow resizing of board size: min 2x2 grids, max 9x9 grids 
+ DONE – added audio: sound effects to tile click, background music and winner music
+ DONE - Keep track of multiple game rounds with a win counter
+ DONE – Created "Restart Game"
+ DONE – Incorporate logic for "Draw" situations
+ DONE – Locked tiles that have already been clicked on!
+ DONE – if game won, set background to banana dancing gif



