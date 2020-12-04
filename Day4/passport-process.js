const fs = require("fs");
const readline = require("readline");
let passports = [];
let validPassports = 0;
const file = readline.createInterface({
  input: fs.createReadStream("data.txt"),
  output: process.stdout,
  terminal: false,
});
const requiredKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
let currentPassport = {};

const hasAllKeys = (passport) => {
  for (let k of requiredKeys) {
    if (!passport.hasOwnProperty(k)) {
      return false;
    }
  }
  return true;
};

file
  .on("line", (line) => {
    if (line.length == 0) {
      passports.push(currentPassport);
      currentPassport = {};
    } else {
      let parts = line.split(" ");
      for (let part of parts) {
        let keyVals = part.split(":");
        let key = keyVals[0].trim();
        let val = keyVals[1].trim();
        currentPassport[key] = val;
      }
    }
  })
  .on("close", () => {
    passports.push(currentPassport);
    for (let i = 0; i < passports.length; i++) {
      if (hasAllKeys(passports[i])) {
        validPassports++;
      }
    }
    console.log(`${validPassports} valid passports`);
  });
