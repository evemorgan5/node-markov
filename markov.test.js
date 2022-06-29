"use strict";

const { MarkovMachine, generateMarkov } = require("./markov.js");

test('getChains test', function () {
    const catInHatMarkov = new MarkovMachine("The cat in the hat.");
    expect(catInHatMarkov.chains).toEqual({
           "The": ["cat"],
           "cat": ["in"],
           "in": ["the"],
           "the": ["hat."],
           "hat.": [null],
          })
})

test('getText test', function () {
    const catInHatMarkov = new MarkovMachine("The cat in the hat.");
    expect(catInHatMarkov.getText()).toEqual("The cat in the hat.");
})