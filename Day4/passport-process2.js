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
const eyeColours = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
let currentPassport = {};
const validateEye = (eye) => {
  for (let ec of eyeColours) {
    if (eye == ec) {
      return true;
    }
  }
  return false;
};
const validateYear = (year, lower, upper) => {
  if (!isNumeric(year)) return false;
  let yearInt = parseInt(year);
  return yearInt >= lower && yearInt <= upper;
};

const validatePID = (pid) => {
  if (pid.length != 9) return false;
  return isNumeric(pid);
};
const validateHeight = (height) => {
  if (height.endsWith("in") || height.endsWith("cm")) {
    let val = height.substring(0, height.length - 2);
    if (isNumeric(val)) {
      let valAsInt = parseInt(val);
      if (height.endsWith("in")) {
        return valAsInt >= 59 && valAsInt <= 76;
      } else {
        return valAsInt >= 150 && valAsInt <= 193;
      }
    }
  }
  return false;
};

const validateHCL = (hcl) => {
  hcl = hcl.trim();
  if (hcl.length != 7) return false;
  if (!hcl.startsWith("#")) {
    return false;
  }
  for (let i = 1; i < hcl.length; i++) {
    if (!isNumeric(hcl[i])) {
      if (!hcl[i].match(/[a-f]/i)) {
        return false;
      }
    }
  }
  return true;
};
const validate = (k, passport) => {
  if (k == "byr") {
    return validateYear(passport[k], 1920, 2002);
  } else if (k == "iyr") {
    return validateYear(passport[k], 2010, 2020);
  } else if (k == "eyr") {
    return validateYear(passport[k], 2020, 2030);
  } else if (k == "hgt") {
    return validateHeight(passport[k]);
  } else if (k == "hcl") {
    return validateHCL(passport[k]);
  } else if (k == "ecl") {
    return validateEye(passport[k]);
  } else if (k == "pid") {
    return validatePID(passport[k]);
  } else {
    console.log("none of this happaened");
  }
  return true;
};

const hasAllKeys = (passport) => {
  for (let k of requiredKeys) {
    if (!passport.hasOwnProperty(k)) {
      return false;
    } else if (!validate(k, passport)) {
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

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
