console.log("Tic Tac Toe");


/*

STATE:
- Players
- Who's turn
- What's on the board

ON EACH MOVE:
- Check if move valid
- Update the board state
- Check if there's a winner -- > end the game if so
- ... Change the turn

*/

const player1 = {
    moves: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    name: "Player 1",
    mark: "X"
}
const player2 = {
    moves: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],
    name: "Player 2",
    mark: "O"
}



let turn = player1; // Player 1 starts

const slots = document.querySelectorAll(".slot");
slots.forEach((slot, index) => {
    slot.addEventListener("click", () => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        playMove(row, col);
    });
});

function updateUIWithMove(row, col){
    const slots = [...document.querySelectorAll(".slot")]
    // find based on data-row and data-col
    const slot = slots.find(slot => slot.dataset.row == row && slot.dataset.col == col);
    slot.innerText = turn.mark
}
function isValidMove(row, col){
    return player1.moves[row][col] === null && player2.moves[row][col] === null;
}
function updateMoveState(row, col){
    turn.moves[row][col] = turn.mark;
}
function checkWinner(){
    console.log("Checking winner");
    // Check rows
    for(let i = 0; i < 3; i++){
        if(player1.moves[i][0] === "X" && player1.moves[i][1] === "X" && player1.moves[i][2] === "X"){
            console.log("Player 1 wins");
            return;
        }
        if(player2.moves[i][0] === "O" && player2.moves[i][1] === "O" && player2.moves[i][2] === "O"){
            console.log("Player 2 wins");
            return;
        }
    }
    // Check columns
    for(let i = 0; i < 3; i++){
        if(player1.moves[0][i] === "X" && player1.moves[1][i] === "X" && player1.moves[2][i] === "X"){
            console.log("Player 1 wins");
            return;
        }
        if(player2.moves[0][i] === "O" && player2.moves[1][i] === "O" && player2.moves[2][i] === "O"){
            console.log("Player 2 wins");
            return;
        }
    }
    // Check diagonals
    if(player1.moves[0][0] === "X" && player1.moves[1][1] === "X" && player1.moves[2][2] === "X"){
        console.log("Player 1 wins");
        return;
    }
    if(player2.moves[0][0] === "O" && player2.moves[1][1] === "O" && player2.moves[2][2] === "O"){
        console.log("Player 2 wins");
        return;
    }
    if(player1.moves[0][2] === "X" && player1.moves[1][1] === "X" && player1.moves[2][0] === "X"){
        console.log("Player 1 wins");
        return;
    }
    if(player2.moves[0][2] === "O" && player2.moves[1][1] === "O" && player2.moves[2][0] === "O"){
        console.log("Player 2 wins");
        return;
    }
}
function changeTurn(){
    turn = turn === player1 ? player2 : player1;
}
function playMove(row, col){
    if(!isValidMove(row, col)) return; // Do nothing if invalid move
    updateMoveState(row, col);
    updateUIWithMove(row, col)
    checkWinner(); // This will end game if there's a winner
    changeTurn();
}

////////////////



const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;




const movesMap = {
    // top left
    'top left': [0, 0],
    // top middle
    'top middle': [0, 1],
    // top right
    'top right': [0, 2],
    // middle left
    'middle left': [1, 0],
    // centre
    'centre': [1, 1],
    'santa': [1, 1],
    // middle right
    'middle right': [1, 2],
    // bottom left
    'bottom left': [2, 0],
    // bottom middle
    'bottom middle': [2, 1],
    // bottom right
    'bottom right': [2, 2]
}

const recognizedMoves = Object.keys(movesMap);


const grammar = `#JSGF V1.0; grammar colors; public <color> = ${recognizedMoves.join(
    " | ",
  )};`;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "en-GB";
recognition.interimResults = false;
recognition.maxAlternatives = 1;


const recogButton = document.querySelector("#recogButton");
recogButton.addEventListener("click", () => {
    recognition.start();
    console.log("Ready to receive a move command.");
});

recognition.onresult = (event) => {
    console.log("Result received.", event.results);
    const move = event.results[0][0].transcript;
    const [row, col] = convertTextToValidMove(move);
    playMove(row, col);
    recognition.stop();
    setTimeout(() => {
        recognition.start();
    }, 1000);
  };




  function convertTextToValidMove(spokenText){
    console.log("Spoken text:", spokenText);
    // takes in a string and returns a valid move with row and col
    // e.g. top left -> [0,0]
    // e.g. bottom right -> [2,2]
    if (!recognizedMoves.includes(spokenText.toLowerCase())) throw new Error("Invalid move. Please try again.");
    return movesMap[spokenText.toLowerCase()];
    // BONUS: If spokenText is not valid, make the computer speak "Invalid move. Please try again."
}