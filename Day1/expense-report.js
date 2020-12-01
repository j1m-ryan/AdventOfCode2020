const fs = require("fs");
const readline = require("readline");
const data = fs.readFileSync("./expense-report-input.txt", "UTF-8");
const lines = data.split(/\r?\n/);
let nums = [];
lines.forEach((line) => {
  nums.push(parseInt(line));
});
for (let i = 0; i < nums.length - 1; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[i] + nums[j] === 2020) {
      console.log(nums[i] * nums[j]);
    }
  }
}
