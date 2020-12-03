const fs = require("fs");
const readline = require("readline");
const map = [];
let trees = 0;
const file = readline.createInterface({
  input: fs.createReadStream("data.txt"),
  output: process.stdout,
  terminal: false,
});

file
  .on("line", (line) => {
    map.push(Array.from(line.trim()));
  })
  .on("close", () => {
    let i, j;
    i = j = 0;
    while (i < map.length) {
      if (map[i][j] == "#") {
        trees++;
      }
      i++;
      j + 3 < map[0].length ? (j += 3) : (j = (j + 3) % map[0].length);
    }
  })
  .on("close", () => {
    console.log(`there are ${trees} trees`);
  });
