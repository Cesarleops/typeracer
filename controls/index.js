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

    nextWord.classList.add("active");
    mainState.currentWord = nextWord;
    nextLetter.classList.add("active");
    mainState.currentLetter = nextLetter;
    input.value = "";
    return;
  }
}

export function onKeyUp(e) {
  const { key } = e;
  if (key === " ") return;

  const currentWord = mainState.currentWord;
  const input = document.querySelector("input");
  input.maxLength = currentWord.innerText.trim().length;
  console.log("letra actual", mainState.currentLetter);
  input.value.split("").forEach((v, i) => {
    const letterToCheck = currentWord.innerText[i];
    console.log("input v", v);
    const isCorrect = v === letterToCheck;
    const letterClass = isCorrect ? "correct" : "incorrect";
    console.log("es", letterClass);
    mainState.currentLetter.classList.add(letterClass);
  });

  mainState.currentLetter?.classList.remove("active");
  const nextLetter = mainState.currentLetter?.nextElementSibling;

  if (nextLetter) {
    nextLetter.classList.add("active");
    mainState.currentLetter = nextLetter;
  } else {
    mainState.currentLetter?.classList.add("active");
  }
}

function onSpaceKeyPress() {}

function onBackSpaceKeyPress() {}
