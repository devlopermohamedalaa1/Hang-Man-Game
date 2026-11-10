// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
const lettersArray = Array.from(letters);

// Select Letters Container
const lettersContanier = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");

  // Create Text Node
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.classList = "letter-box";

  // Append Span To Letters Contanier
  lettersContanier.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "InterStellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrian", "Qatar"],
};

// Get Random Property

let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContanier = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depend On Word
lettersAndSpace.forEach((letter) => {
  // Create Empty Spans
  let emptySpans = document.createElement("span");

  // If Letters Is Space
  if (letter === " ") {
    // Add Class To Span
    emptySpans.className = "with-space";
  }

  // Append Span To The Letter Guess Container
  lettersGuessContanier.appendChild(emptySpans);
});

// Select All Span
let guessSpan = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set The Chose Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get Checked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      // If Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {
        // Set The Status To Correct
        theStatus = true;

        // Loop On All Spans
        guessSpan.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) span.innerHTML = theClickedLetter;
        });
      }
    });

    // Outside Loop

    // If The Guess Wrong
    if (theStatus !== true) {
      // Increase The Wrong Attempts
      wrongAttempts++;

      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      if (wrongAttempts === 8) {
        endGame("Game Over");

        lettersContanier.classList.add("finished");
      }
    } else {
      // If Donot The Place Empty IN Game
      if (
        [...guessSpan].every(
          (s) => s.innerHTML !== "" || s.className === "with-space",
        )
      ) {
        endGame("You Win");
        lettersContanier.classList.add("finished");
      }
    }
  }
});

// End Game Function
function endGame(message) {
  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(`${message}, The Word Is `);

  // Create Span
  let span = document.createElement("span");
  span.textContent = randomValueValue;

  // Append Text To Div
  div.appendChild(divText);

  // Append Span To DivText
  div.appendChild(span);

  // Add Claa On Div
  div.className = "popup";

  // Append To The Body
  document.body.appendChild(div);
}
