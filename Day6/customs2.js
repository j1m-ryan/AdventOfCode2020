const fs = require("fs");
const readline = require("readline");

const file = readline.createInterface({
  input: fs.createReadStream("data.txt"),
  output: process.stdout,
  terminal: false,
});
let everyOneAnswered = 0;
let currentGroup = {};
let currentGroupSize = 0;
file
  .on("line", (line) => {
    if (line.length != 0) {
      for (let c of line) {
        if (Object.prototype.hasOwnProperty.call(currentGroup, c)) {
          currentGroup[c]++;
        } else {
          currentGroup[c] = 1;
        }
      }
      currentGroupSize++;
    } else {
      for (let prop in currentGroup) {
        if (Object.prototype.hasOwnProperty.call(currentGroup, prop)) {
          if (currentGroup[prop] == currentGroupSize) {
            everyOneAnswered++;
          }
        }
      }
      currentGroup = {};
      currentGroupSize = 0;
    }
  })
  .on("close", () => {
    for (let prop in currentGroup) {
      if (Object.prototype.hasOwnProperty.call(currentGroup, prop)) {
        if (currentGroup[prop] == currentGroupSize) {
          everyOneAnswered++;
        }
      }
    }
    console.log(
      `For each group, the sum of Q's that everyone answered is :${everyOneAnswered} `
    );
  });
