const letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  span.textContent = letter;
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

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
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  person: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

document.querySelector(".game-info .category span").textContent =
  randomPropName;

let lettersGuessContainer = document.querySelector(".letters-guess");

let lettersAndSpace = Array.from(randomValueValue);

lettersAndSpace.forEach((letter) => {
  let span = document.createElement("span");
  if (letter === " ") {
    span.className = "has-space";
  }
  lettersGuessContainer.appendChild(span);
});

let guessSpans = document.querySelectorAll(".letters-guess span");

let wrongAttempts = 0;

let wrongAttemptsSpan = document.querySelector(".wrong-attempts span");
wrongAttemptsSpan.textContent = wrongAttempts;

// console.log(wrongAttemptsSpan.textContent++);

let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    let theClickedLetter = e.target.innerHTML.toLowerCase();

    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      if (wordLetter === theClickedLetter) {
        theStatus = true;

        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.textContent = wordLetter;
          }
        });
      }
    });

    //outside loop
    if (theStatus !== true) {
      wrongAttempts++;

      wrongAttemptsSpan.textContent++;

      theDraw.classList.add(`wrong-${wrongAttempts}`);

      document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        endGame();

        lettersContainer.classList.add("finished");
      }
    } else {
      document.getElementById("success").play();
      let ansArray = [];
      guessSpans.forEach((span) => {
        ansArray.push(span.textContent);
        let spansContent = ansArray.join("");

        if (spansContent == theChosenWord.join("").split(" ").join("")) {
          endGame();

          lettersContainer.classList.add("finished");
        }
      });
    }
  }
});

function endGame() {
  let div = document.createElement("div");
  let divtext;

  if (wrongAttempts === 8) {
    divtext = document.createTextNode(
      `Game Over, The Word Is ${randomValueValue}`
    );
  } else {
    divtext = document.createTextNode(`Congratulations, You Won The Game!`);
  }

  div.appendChild(divtext);

  div.className = "popup";

  document.body.appendChild(div);
}

// Refresh Page By Pressing The ESC key
function refreshPage(event) {
  if (event.key === "Escape") {
    window.location.reload();
  }
}

document.addEventListener("keyup", refreshPage);
