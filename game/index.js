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

    console.log("Let", currentLetter);
    console.log("Wor", currentWord);

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
      wordHasErrors ? currentWordEl.classList.add("marked") : "";
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
