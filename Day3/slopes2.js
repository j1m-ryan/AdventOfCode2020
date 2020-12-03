const fs = require("fs");
const readline = require("readline");
const map = [];
const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];
let trees = new Array(slopes.length).fill(0);
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
    for (let k = 0; k < slopes.length; k++) {
      let i = 0;
      let j = 0;
      let down = slopes[k][1];
      let right = slopes[k][0];

      while (i < map.length) {
        if (map[i][j] == "#") {
          trees[k]++;
        }
        i += down;
        j + right < map[0].length
          ? (j += right)
          : (j = (j + right) % map[0].length);
      }
    }
    let total = 1;
    for (let t of trees) {
      total *= t;
    }
    console.log(`the ans is ${total}`);
  });
