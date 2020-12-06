const fs = require("fs");
const readline = require("readline");

const file = readline.createInterface({
  input: fs.createReadStream("data.txt"),
  output: process.stdout,
  terminal: false,
});
let uniqueQuestionsYesInEachGroup = 0;
let currentGroup = new Set();
file
  .on("line", (line) => {
    if (line.length != 0) {
      for (let c of line) {
        currentGroup.add(c);
      }
    } else {
      uniqueQuestionsYesInEachGroup += currentGroup.size;
      currentGroup = new Set();
    }
  })
  .on("close", () => {
    uniqueQuestionsYesInEachGroup += currentGroup.size;
    console.log(
      `Unique questions answered yes:${uniqueQuestionsYesInEachGroup} `
    );
  });
