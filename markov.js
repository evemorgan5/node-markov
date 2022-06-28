/** Textual markov chain generator. */


// const randomChoice = require("random-choice");

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
    // TODO: implement this!
    let markovChain = {};
    for (let i=0; i<this.words.length; i++) {
      if (i === this.words.length -1) {
        if (markovChain[this.words[i]] === undefined) {
          markovChain[this.words[i]] = [null];
        }
        else {
          markovChain[this.words[i]].push(null);
        }
        return markovChain;
      }
      if (this.words[i] in markovChain) {
        markovChain[this.words[i]].push(this.words[i+1]);
      }
      else {
        markovChain[this.words[i]] = [this.words[i+1]];
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

    let startingWord = this.words[0];
    let story = [startingWord];


    while (true) {
      let indexLastWord = story.length-1;
      let indexNextWord = getRandomInt(
        this.chains[[indexLastWord]].length)
      let nextWord = this.chains[story[indexLastWord]][indexNextWord]
      if (nextWord != null) {
        story.push(nextWord);
      }
      else {
        return story.join(" ");
      }
    }
  }
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let gtext;
const fsP = require("fs/promises");

async function readMyFile(file) {
  console.log("running");
  try {
    let contents = await fsP.readFile(file, "utf8");
    console.log(contents);
    gtext = contents;
  }
  catch (err) {
    console.error(err.message)
    process.exit(1);
  }
}

readMyFile("eggs.txt");
console.log(gtext);


const catInHatMachine = new MarkovMachine(gtext);
catInHatMachine.getText();
console.log(catInHatMachine.getText());

