var Word = require('./word.js');

var wordArray = ["mickey", "minnie", "donald", "daisy", "goofy", "pluto",];

function Game() {

    this.wins = 0;
    this.losses = 0;
    this.guessRemaining = 0;
    this.lettersGuessed = [];
    this.word = null;

    this.startNewGame = function () {
        this.guessRemaining = 7;
        this.lettersGuessed = [];
        this.word = this.generateRandWord();
        console.log("Lets start Disney Character Hangman!");
    };

    this.generateRandWord = function () {
        var randWord = wordArray[Math.floor(Math.random() * wordArray.length)];
        //console.log(randWord);
        var newWord = new Word(randWord);
        newWord.generateGuessWord();
        return newWord;
    };
};


//Export game constructor
module.exports = Game;