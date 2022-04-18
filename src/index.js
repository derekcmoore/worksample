const { findAndRunCommand } = require("./commands.js");

const { question } = require("readline-sync");

let command = null;
let key = null;
let value = null;

async function run() {
  while (true) {
    const input = question("> ");
    parseInput(input);
    findAndRunCommand(command, key, value);
  }
}

function parseInput(input) {
  let parsedInput = input.split(" ");
  command = parsedInput[0];
  key = parsedInput[1];
  value = parsedInput[2];
}

run().then();
