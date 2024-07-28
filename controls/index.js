import { mainState } from "../index.js";

export function onKeyPress(e) {
  if (e.key === mainState.currentLetter) {
    mainState.wordsStreak++;
    document.querySelector(".streak").textContent = mainState.wordsStreak;
  }
}

export function onKeyUp() {}
