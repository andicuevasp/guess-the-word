const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".gaining");
const remainingGuessesNum = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia"; //starting word to test game

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
    const guess = letterInput.value;
    console.log(guess);

    letterInput.value = "";
});


