// import { onKeyPress, onKeyUp } from "./controls/index.js";
import { Game } from "./game/index.js";

const DEFAULT_TIME = 30;

let game = {};
let currentTime = DEFAULT_TIME;

export const mainState = {
  currentLetter: "",
  wordsStreak: 0,
  currentWord: "",
};
let paragraphEl = document.querySelector("p");
let inputEl = document.querySelector("input");
let TEXT =
  "abc state stand they or set say through open begin must play give again part own call so this much follow over think first even write see we man then be after program must also it year more begin can if line time over what get run public";

function startGame() {
  game = new Game(TEXT);
  game.startGame();
  //   words = TEXT.split(" ");
  //   inputEl = "";
  //   document.querySelector(".streak").textContent = mainState.wordsStreak;
  //   document.querySelector("time").textContent = currentTime;
  //   paragraphEl.innerHTML = words
  //     .map((w) => {
  //       const letters = w.split("");

  //       return `<span class="word">
  //     ${letters.map((l) => `<span class="letter">${l}</span>`).join("")}
  // </span>`;
  //     })
  //     .join("");

  //   const firstWord = document.querySelector(".word");
  //   const firstLetter = document.querySelector(".letter");
  //   mainState.currentLetter = firstLetter;
  //   mainState.currentWord = firstWord;
  //   firstWord.classList.add("active");
  //   firstWord.querySelector(".letter").classList.add("active");
}

function startEvents() {
  const intervalId = setInterval(() => {
    currentTime--;
    document.querySelector("time").innerHTML = currentTime;

    if (currentTime === 0) {
      clearInterval(intervalId);
    }
  }, 1000);
}
// inputEl.addEventListener("keydown", onKeyPress);
inputEl.addEventListener("keyup", (e) => game.handleType(e));

startGame();
startEvents();
