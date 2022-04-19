const { findAndRunCommand } = require("./commands.js");

const { question } = require("readline-sync");

let command = null;
let key = null;
let value = null;

async function run() {
  while (true) {
    const input = question("> ");
    parseInput(input);
    if (command === "EXIT") break;
    findAndRunCommand(command, key, value);
  }
}

function parseInput(input) {
  let parsedInput = input.split(" ");
  command = parsedInput[0].toUpperCase();
  key = parsedInput[1] ? parsedInput[1] : null;
  value = parsedInput[2] ? parsedInput[2] : null;
}

run().then();
