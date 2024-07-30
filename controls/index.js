import { mainState } from "../index.js";

export function onKeyPress(e) {
  const { key } = e;

  const input = document.querySelector("input");
  if (key === " ") {
    e.preventDefault();
    const nextWord = mainState.currentWord.nextElementSibling;
    const nextLetter = nextWord.querySelector(".letter");

    mainState.currentWord.classList.remove("active");
    mainState.currentLetter.classList.remove("active");

    const checkForErrors =
      mainState.currentWord.querySelectorAll(".letter:not(.correct)").length >
      0;

    checkForErrors ? mainState.currentWord.classList.add("marked") : "";
    if (!mainState.currentWord.classList.contains("marked")) {
      console.log("netos");
      mainState.wordsStreak++;
      document.querySelector(".streak").textContent = mainState.wordsStreak;
    }
    nextWord.classList.add("active");
    mainState.currentWord = nextWord;
    nextLetter.classList.add("active");
    mainState.currentLetter = nextLetter;
    input.value = "";

    return;
  }

  if (key === "Backspace") {
    const prevWord = mainState.currentWord.previousElementSibling;
    let prevLetter = mainState.currentLetter.previousElementSibling;

    if (!prevLetter && !prevWord) {
      e.preventDefault();
      return;
      //Puede que este en la primera letra de la frase o en la primera letra de una palabra
      //Si es la primera letra de la frase no debe poder hacer nada
      //Si es la primera letra de una palabra debe saltar a la ultima correcta de la anterior
      //Si la letra anterior es correcta no debe poder hacer nada
    }
    console.log("palabra anterior", prevWord);
    if (!prevLetter && prevWord) {
      const lastCorrectLetter = prevWord.querySelectorAll(".incorrect")[0];
      console.log("last", lastCorrectLetter);
      lastCorrectLetter.classList.add("active");
      mainState.currentLetter.classList.remove("active");
      mainState.currentLetter = lastCorrectLetter;
    }
    console.log("letra anterior", prevLetter);
  }
}

export function onKeyUp(e) {
  const { key } = e;
  if (key === " ") return;
  if (key === "Backspace") return;

  const currentWord = mainState.currentWord;
  const input = document.querySelector("input");
  input.maxLength = currentWord.innerText.trim().length;

  input.value.split("").forEach((v, i) => {
    const letterToCheck = currentWord.innerText[i];
    const isCorrect = v === letterToCheck;
    const letterClass = isCorrect ? "correct" : "incorrect";
    mainState.currentLetter.classList.remove("correct", "incorrect");
    mainState.currentLetter.classList.add(letterClass);
  });

  mainState.currentLetter?.classList.remove("active");
  const nextLetter = mainState.currentLetter?.nextElementSibling;

  if (nextLetter) {
    nextLetter.classList.add("active");
    mainState.currentLetter = nextLetter;
  } else {
    mainState.currentLetter?.classList.add("active", "lastone");
  }
}

function onSpaceKeyPress() {}

function onBackSpaceKeyPress() {}
