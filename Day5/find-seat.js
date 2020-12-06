const fs = require("fs");
const readline = require("readline");

const file = readline.createInterface({
  input: fs.createReadStream("data.txt"),
  output: process.stdout,
  terminal: false,
});
let maxSeat = 0;

const calcSeatNum = (str) => {
  let rowInfo = str.substring(0, 7);
  let colInfo = str.substring(7);
  let rowsHigh = 127;
  let rowsLow = 0;
  let colsHigh = 7;
  let colsLow = 0;
  for (let c of rowInfo) {
    if (c == "F") {
      rowsHigh = Math.floor(rowsHigh - (rowsHigh - rowsLow) / 2);
    } else {
      rowsLow = Math.ceil(rowsLow + (rowsHigh - rowsLow) / 2);
    }
  }
  for (let c of colInfo) {
    if (c == "L") {
      colsHigh = Math.floor(colsHigh - (colsHigh - colsLow) / 2);
    } else {
      colsLow = Math.ceil(colsLow + (colsHigh - colsLow) / 2);
    }
    console.log("higher", colsHigh, "lower", colsLow);
  }
  console.log(
    "row",
    Math.min(rowsHigh, rowsLow),
    "col",
    Math.max(colsHigh, colsLow)
  );
  return Math.min(rowsHigh, rowsLow) * 8 + Math.max(colsHigh, colsLow);
};

file
  .on("line", (line) => {
    maxSeat = Math.max(maxSeat, calcSeatNum(line));
  })
  .on("close", () => {
    console.log(`Max seat num:${maxSeat} `);
  });
