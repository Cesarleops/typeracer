import { Game } from "./game/index.js";
import { generateRandomPhrase } from "./utils/index.js";

const DEFAULT_TIME = 30;

let game = {};
let currentTime = DEFAULT_TIME;

let inputEl = document.querySelector("input");
const gameTable = document.querySelector(".game");
const restart = document.getElementById("restart");
let TEXT =
  "abc state stand they or set say through open begin must play give again part own call so this much follow over think first even write see we man then be after program must also it year more begin can if line time over what get run public";

function startGame() {
  game = new Game(TEXT);
  game.startGame();
}

function startEvents() {
  const intervalId = setInterval(() => {
    currentTime--;

    if (!document.querySelector(".time")) {
      clearInterval(intervalId);
      return;
    }
    document.querySelector("time").innerHTML = currentTime;

    if (currentTime === 0) {
      clearInterval(intervalId);
    }
  }, 1000);
}
// inputEl.addEventListener("keydown", onKeyPress);
inputEl.addEventListener("keyup", (e) => game.handleType(e));
gameTable.addEventListener("click", () => {
  inputEl.focus();
});

restart.addEventListener("click", () => {
  console.log("start new game");
  TEXT = generateRandomPhrase(48);
  startGame();
});

startGame();
startEvents();
