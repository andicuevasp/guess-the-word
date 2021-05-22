const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".gaining");
const remainingGuessesSpan = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
let word = "magnolia"; //starting word to test game
const guessedLetters = []
let remainingGuesses = 8;

//function to get word from API
const getWord = async function(){
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex =Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};


// function adds place holders for each letter
const placeholder = function(word){
    const placeholderLetters = [];
    for(const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }

    wordInProgress.innerText = placeholderLetters.join("");
};

getWord();

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

//function to capture input (guesses)
const makeGuess = function(guess) {
    guess = guess.toUpperCase();

    if(guessedLetters.includes(guess)){
        message.innerText = "You've already guessed that letter, try a new one!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

//function to show the guessed letters
const showGuessedLetters = function() {
    guessedLettersElement.innerHTML = "";
    for(const letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

//function to update the word in progress
const updateWordInProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    
    for(const letter of wordArray){
        if(guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }

    wordInProgress.innerText = revealWord.join("");
    checkIfWin();

};

//function to count guesses remaining
const updateGuessesRemaining = function(guess){
    const upperWord =word.toUpperCase();
    if(!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word does not contain this letter.`;
        remainingGuesses -=1;
    } else {
        message.innerText = `You guessed the letter ${guess} correctly!`;
    }

    if(remainingGuesses === 0){
        message.innerHTML = `Sorry, you're out of guesses. The word was <span class = "highlight"> ${upperWord}</span>.`;
    } else if (remainingGuesses === 1){
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

//function to check if player won
const checkIfWin = function(){
    if(wordInProgress.innerText === word.toUpperCase()){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word correctly! Congrats!</p>`;
    }
};


