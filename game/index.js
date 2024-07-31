export class Game {
  constructor(text) {
    this.words = text.split(" ");
    this.allWordsEl = null;
    this.currentWordIdx = 0;
    this.currentLetterIdx = 0;
  }

  startGame() {
    let paragraphEl = document.querySelector("p");
    paragraphEl.innerHTML = this.words
      .map((w, i) => {
        const letters = w.split("");

        return `<span class="word">
                ${letters
                  .map((l) => `<span class="letter">${l}</span>`)
                  .join("")}
            </span>`;
      })
      .join("");
    this.allWordsEl = document.querySelectorAll(".word");
  }

  handleType(e) {
    const { key } = e;
    const currentWord = this.words[this.currentWordIdx];
    const currentLetter = currentWord[this.currentLetterIdx];
    const currentWordEl = this.allWordsEl[this.currentWordIdx];
    const currentWordLetters = currentWordEl.querySelectorAll(".letter");

    if (key === "Backspace") {
      //Two possible cases, the cursor is in the first letter of a word, or in any other letter.
      //When backspacing i have to remove the correct letters
      const prevLetter = currentWordLetters[this.currentLetterIdx - 1];

      const prevWord = currentWordEl.previousElementSibling;

      if (this.currentWordIdx === 0 && this.currentLetterIdx === 0) {
        console.log("first letter of first word");
        return;
      }

      if (this.currentLetterIdx === 0 && this.currentWordIdx > 0) {
        console.log("retrocede a una palabra anterior");
        //Move the cursor to the last letter of the previous word
        this.currentWordIdx--;
        this.currentLetterIdx = prevWord.querySelectorAll(".letter").length;
        return;
      }

      this.currentLetterIdx--;

      currentWordLetters[this.currentLetterIdx].classList.remove(
        "correct",
        "incorrect"
      );

      if (prevLetter && prevLetter.classList.contains("incorrect")) {
        console.log("retrocede dentro de una palabra");

        return;
      }

      return;
    }

    if (this.currentLetterIdx >= currentWord.length && key != " ") {
      console.log("word is finished and you are not jumping");
      return;
    }

    if (key === " ") {
      e.preventDefault();
      console.log("already completed the word");
      document.querySelector("input").value = "";

      const wordHasErrors =
        currentWordEl.querySelectorAll(".letter:not(.correct)").length > 0;
      console.log("errors ? ", wordHasErrors);
      wordHasErrors
        ? currentWordEl.classList.add("marked")
        : currentWordEl.classList.remove("marked");
      this.currentWordIdx++;
      this.currentLetterIdx = 0;
      return;
    }

    if (key === currentLetter) {
      currentWordEl
        .querySelectorAll(".letter")
        [this.currentLetterIdx].classList.add("correct");
    } else {
      currentWordEl
        .querySelectorAll(".letter")
        [this.currentLetterIdx].classList.add("incorrect");
    }

    this.currentLetterIdx++;
  }

  handleBackSpace() {}

  handleSpace() {}
}
