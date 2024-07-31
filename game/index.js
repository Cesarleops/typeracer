export class Game {
  constructor(text) {
    this.words = text.split(" ");
    this.allWordsEl = null;
    this.currentWordIdx = 0;
    this.currentLetterIdx = 0;
    this.streak = 0;
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
    document.querySelector(".letter").classList.add("active");
  }

  handleType(e) {
    const { key } = e;
    const currentWord = this.words[this.currentWordIdx];
    const currentLetter = currentWord[this.currentLetterIdx];
    const currentWordEl = this.allWordsEl[this.currentWordIdx];
    const currentWordLetters = currentWordEl.querySelectorAll(".letter");
    console.log("my streak", this.streak);

    if (key === "Backspace") {
      //Two possible cases, the cursor is in the first letter of a word, or in any other letter.
      //When backspacing i have to remove the correct letters

      const prevWord = currentWordEl.previousElementSibling;

      if (this.currentWordIdx === 0 && this.currentLetterIdx === 0) {
        console.log("first letter of first word");
        return;
      }

      if (this.currentLetterIdx === 0 && this.currentWordIdx > 0) {
        console.log("retrocede a una palabra anterior");
        //Move the cursor to the last letter of the previous word
        const pre = prevWord.querySelectorAll(".letter");
        this.currentWordIdx--;
        currentWordLetters[this.currentLetterIdx].classList.remove("active");
        this.currentLetterIdx = pre.length;
        pre[this.currentLetterIdx - 1].classList.add("last");

        return;
      }

      if (this.currentLetterIdx === currentWord.length) {
        currentWordLetters[this.currentLetterIdx - 1].classList.remove("last");
      } else {
        currentWordLetters[this.currentLetterIdx].classList.remove("active");
      }
      this.currentLetterIdx--;
      if (this.currentLetterIdx === currentWordLetters.length) {
        console.log("esta es la ultima letra");
        currentWordLetters[this.currentLetterIdx - 1].classList.add("last");

        return;
      }
      currentWordLetters[this.currentLetterIdx].classList.add("active");

      currentWordLetters[this.currentLetterIdx].classList.remove(
        "correct",
        "incorrect"
      );

      return;
    }

    if (this.currentLetterIdx >= currentWord.length && key != " ") {
      return;
    }

    if (key === " ") {
      e.preventDefault();
      document.querySelector("input").value = "";
      if (this.currentLetterIdx < currentWord.length) {
        currentWordLetters[this.currentLetterIdx].classList.remove("active");
      }

      if (this.currentLetterIdx === currentWord.length) {
        currentWordLetters[this.currentLetterIdx - 1].classList.remove("last");
      }
      const wordHasErrors =
        currentWordEl.querySelectorAll(".letter:not(.correct)").length > 0;
      wordHasErrors
        ? currentWordEl.classList.add("marked")
        : currentWordEl.classList.remove("marked");

      if (!currentWordEl.classList.contains("marked")) {
        this.streak++;
      } else {
        this.streak = 0;
      }
      this.currentWordIdx++;
      this.currentLetterIdx = 0;
      currentWordEl.nextElementSibling
        .querySelector(".letter")
        .classList.add("active");

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

    currentWordLetters[this.currentLetterIdx].classList.remove("active");
    this.currentLetterIdx++;

    if (this.currentLetterIdx === currentWordLetters.length) {
      console.log("esta es la ultima letra");
      currentWordLetters[this.currentLetterIdx - 1].classList.add("last");

      return;
    }
    currentWordLetters[this.currentLetterIdx].classList.add("active");
  }

  handleBackSpace() {}

  handleSpace() {}
}
