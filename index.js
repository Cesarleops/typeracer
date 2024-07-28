import { onKeyPress } from "./controls/index.js";

const DEFAULT_TIME = 30;

let words = [];

let currentTime = DEFAULT_TIME;

export const mainState = {
  currentLetter: "",
  wordsStreak: 0,
  currentWord: "",
};
let paragraphEl = document.querySelector("p");
let TEXT =
  "back in highschool i use to bus into the dance, now i hit the fbo with duffles in my hands";
function startGame() {
  words = TEXT.split(" ").slice(0, 32);
  document.querySelector(".streak").textContent = mainState.wordsStreak;
  document.querySelector("time").textContent = currentTime;
  paragraphEl.innerHTML = words
    .map((w) => {
      const letters = w.split("");

      return `<span class="word">
    ${letters.map((l) => `<span class="letter">${l}</span>`).join("")}
</span>`;
    })
    .join("");
}

function startEvents() {
  const intervalId = setInterval(() => {
    currentTime--;
    document.querySelector("time").innerHTML = currentTime;

    if (currentTime === 0) {
      clearInterval(intervalId);
    }
  }, 1000);

  const firstWord = document.querySelector(".word");
  const firstLetter = document.querySelector(".letter");
  mainState.currentLetter = firstLetter.textContent;
  firstWord.classList.add("active");
}

document.addEventListener("keydown", onKeyPress);
startGame();
startEvents();
