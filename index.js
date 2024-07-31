// import { onKeyPress, onKeyUp } from "./controls/index.js";
import { Game } from "./game/index.js";

const DEFAULT_TIME = 30;

let game = {};
let currentTime = DEFAULT_TIME;

let inputEl = document.querySelector("input");
let TEXT =
  "abc state stand they or set say through open begin must play give again part own call so this much follow over think first even write see we man then be after program must also it year more begin can if line time over what get run public";

function startGame() {
  game = new Game(TEXT);
  game.startGame();
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
