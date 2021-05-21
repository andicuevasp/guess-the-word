const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".gaining");
const remainingGuessesNum = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia"; //starting word to test game
const guessedLetters = [];


// function adds place holders for each letter
const placeholder = function(word){
    const placeholderLetters = [];
    for(const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }

    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click",function(e){
    e.preventDefault();

    message.innerText = "";

    const guess = letterInput.value;

    const goodGuess = validateInput(guess);

    if(goodGuess){
        makeGuess(guess);
    }
    letterInput.value = "";

});





//function to check player's input
const validateInput = function (input) {
const acceptedLetter = /[a-zA-Z]/;

if(input.length === 0){
    message.innerText = "Please enter a letter.";
} else if (input.length >1) {
    message.innerText = "Please enter one letter at a time.";
} else if(!input.match(acceptedLetter)) {
    message.innerText = "Please enter only letters, no numbers or special characters";
} else {
    return input;
}
};

//function to capture input
const makeGuess = function(guess) {
    guess = guess.toUpperCase();

    if(guessedLetters.includes(guess)){
        message.innerText = "You've already guessed that letter, try a new one!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};
