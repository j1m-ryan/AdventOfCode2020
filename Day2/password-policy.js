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
    let lowerBound = bounds[0];
    let upperBound = bounds[1];
    let instancesOfLetter = 0;
    let password = splitLine[1].trim();
    for (let c of password) {
      if (c == letter) {
        instancesOfLetter++;
      }
    }
    if (instancesOfLetter >= lowerBound && instancesOfLetter <= upperBound) {
      numValidPasswords++;
    }
  })
  .on("close", () => {
    console.log(`Num valid passwords: ${numValidPasswords}`);
  });
