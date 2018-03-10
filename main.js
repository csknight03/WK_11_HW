var inquirer = require('inquirer');
var Game = require('./constructorHangman.js');
var game = new Game();

function startHangman() {

    game.startNewGame();
    
    game.word.displayWord();

    promptAndProcessInput();
}

function promptAndProcessInput() {
    inquirer.prompt([
        {
            type: "input",
            name: "userGuess",
            message: "Guess a letter",
            validate: function (value) {
                var validInputs = /[a-z]|[0-9]/i;
                // Make sure the inputs are valid characters
                if (value.length === 1 && validInputs.test(value)) {
                    // Has the letter has been guessed already
                    if (game.lettersGuessed.length > 0  ) {
        
                        for (var items in game.lettersGuessed) {
                            
                            if (value.toLowerCase() === game.lettersGuessed[items]) {
                                return "This character has already been chosen.\nPlease enter a valid guess (letters a-z or numbers 0-9):"
                            }
                        }
                    }
                    return true;
                }
                return "Please enter a valid guess (letters a-z or numbers 0-9):"
            }
        }
    ]).then(function (answer) {
        game.lettersGuessed.push(answer.userGuess);
        if (game.word.checkLetters(answer.userGuess)) {
            game.word.displayWord();
            if (game.word.isGuessed()) {
                winGame();
            }
            else {
                promptAndProcessInput();
            }
        }
        else {
            game.guessRemaining--;
            console.log("Guesses Remaining: " + game.guessRemaining);
            game.word.displayWord();
            if (game.guessRemaining <= 0) {
                loseGame();
            }
            else {
                promptAndProcessInput();
            }
        }

    })
}

function winGame() {
    game.wins++;
    console.log("Congrats you've won!\nYour current record is: " + game.wins + " wins and: " + game.losses + " losses");

    playAgainPrompt();
}

function loseGame() {
    game.losses++;
    console.log("You lost!\nYour current record is: " + game.wins + " wins and: " + game.losses + " losses");
    console.log("The Disney Character you were trying to guess was: " + game.word.answerWord.join(''))
    playAgainPrompt();
}

function playAgainPrompt() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'playAgain',
            message: 'Would you like to play again?',
        }
    ]).then(function (answer) {
        if (answer.playAgain) {
            startHangman();
        }
        else {
            console.log("Thanks for playing!");
            return;
        }
    });
}

// Call startHangman function
startHangman();