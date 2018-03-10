var regEx = /[a-z]|[0-9]/i;
function Letter(givenChar) {

    this.displayLetter = "_";
    this.secretValue = givenChar;
    this.correct = false;

    this.returnCorrect = function () {
        if (this.correct) {
            return this.secretValue;
        }
        else if (!regEx.test(this.secretValue)) {
            return this.secretValue;
        }
        else {
            return this.displayLetter;
        }
    }
}

// Export constructor Letter
module.exports = Letter;