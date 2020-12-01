const fs = require("fs");
const readline = require("readline");
const data = fs.readFileSync("./expense-report-input.txt", "UTF-8");
const lines = data.split(/\r?\n/);
let nums = [];
lines.forEach((line) => {
  nums.push(parseInt(line));
});
for (let i = 0; i < nums.length - 2; i++) {
  for (let j = i + 1; j < nums.length - 1; j++) {
    for (let k = j + 1; k < nums.length; k++) {
      if (nums[i] + nums[j] + nums[k] === 2020) {
        console.log(nums[i] * nums[j] * nums[k]);
      }
    }
  }
}
