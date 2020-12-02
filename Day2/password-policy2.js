const fs = require("fs");
const readline = require("readline");
let numValidPasswords = 0;

const file = readline.createInterface({
  input: fs.createReadStream("day2input.txt"),
  output: process.stdout,
  terminal: false,
});

file
  .on("line", (line) => {
    let splitLine = line.split(":");
    let policy = splitLine[0].trim();
    let letter = policy[policy.length - 1];
    policy = policy.slice(0, -1);
    let bounds = policy.split("-");
    let pos1 = bounds[0];
    let pos2 = bounds[1];
    let password = splitLine[1].trim();

    if ((password[pos1 - 1] == letter) ^ (password[pos2 - 1] == letter)) {
      numValidPasswords++;
    }
  })
  .on("close", () => {
    console.log(`Num valid passwords: ${numValidPasswords}`);
  });
