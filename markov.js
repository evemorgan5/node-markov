"use strict";

const fsP = require("fs/promises");

/** Textual markov chain generator. */

class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    // TODO: implement this! else on same lines as curly braces
    let markovChain = {};
    for (let i = 0; i < this.words.length; i++) {
      if (i === this.words.length - 1) {
        if (markovChain[this.words[i]] === undefined) {
          markovChain[this.words[i]] = [null];
        } else {
          markovChain[this.words[i]].push(null);
        }
        return markovChain;
      }
      if (this.words[i] in markovChain) {
        markovChain[this.words[i]].push(this.words[i + 1]);
      } else {
        markovChain[this.words[i]] = [this.words[i + 1]];
      }
    }
    return markovChain;
  }



  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // TODO: implement this!

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
    const startingWord = this.words[0];
    let outputStory = [startingWord];


    while (true) {
      let indexLastWord = outputStory.length - 1;
      let indexNextWord = getRandomInt(
        this.chains[outputStory[indexLastWord]].length)
      let nextWord = this.chains[outputStory[indexLastWord]][indexNextWord]
      if (nextWord != null) {
        outputStory.push(nextWord);
      } else {
        return outputStory.join(" ");
      }
    }
  }
}

/** Takes in a max number, returns a random number between 0-max */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/** Takes in a file name, updates global gtext with the contents of the
 *  file.
 */
async function readMyFile(filePath) {
  try {
    let contents = await fsP.readFile(filePath, "utf8");
    return contents;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

/** Takes in a file name, generates a MarkovMachine with the contents of the 
 *  file, generates markov text and logs in console.
 */
async function generateMarkov(filePath) {
  const newText = await readMyFile(filePath);

  const markovMachine = new MarkovMachine(newText);
  markovMachine.getText();
  console.log(markovMachine.getText());
}

module.exports= {MarkovMachine, generateMarkov};
