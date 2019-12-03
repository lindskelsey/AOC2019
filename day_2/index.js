const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf-8")
  .split(",")
  .map(Number);

// Part 1

const programSetup = (input, noun, verb) => {
  let code = input.slice(0);
  code[1] = noun;
  code[2] = verb;
  return code;
};

const opCodeOne = (a, b) => a + b;
const opCodeTwo = (a, b) => a * b;

const intCodeProgram = input => {
  let code = input.slice(0);

  for (let i = 0; i < code.length; i += 4) {
    let n1 = code[code[i + 1]];
    let n2 = code[code[i + 2]];
    let n3 = code[i + 3];
    let x = code[i];

    useCode(code, n1, n2, n3, x);
  }

  return code;
};

const useCode = (code, n1, n2, n3, x) => {
  if (x === 1) {
    code[n3] = opCodeOne(n1, n2);
  } else if (x === 2) {
    code[n3] = opCodeTwo(n1, n2);
  } else if (x === 99) {
    return code;
  }
};

//Part 2

const findNounAndVerb = (input, noun, verb) => {
  let inputCopy = input.slice(0);
  const setup = programSetup(inputCopy, noun, verb);
  program = intCodeProgram(setup);

  return { code: program[0], calc: 100 * noun + verb };
};

const middle = (a, b) => Math.floor((a + b) / 2);

const binarySearch = (input, expectedValue, fn) => {
  let [firstI, lastI, firstJ, lastJ] = [0, 99, 0, 99];
  let middleI = middle(firstI, lastI);
  let middleJ = middle(firstJ, lastJ);
  let value = fn(input, middleI, middleJ);

  while (expectedValue != value.code && firstI < lastI) {
    while (expectedValue != value.code && firstJ < lastJ) {
      if (value.code > expectedValue) {
        lastJ = middleJ - 1;
      } else if (value.code < expectedValue) {
        firstJ = middleJ + 1;
      }
      middleJ = middle(firstJ, lastJ);
      value = fn(input, middleI, middleJ);
    }

    if (value.code > expectedValue) {
      lastI = middleI - 1;
    } else if (value.code < expectedValue) {
      firstI = middleI + 1;
    }
    middleI = middle(firstI, lastI);
    value = fn(input, middleI, middleJ);
    firstJ = 0;
    lastJ = 99;
    middleJ = middle(firstJ, lastJ);
  }

  return expectedValue != value.code ? "error" : value.calc;
};

//Log

const partOne = intCodeProgram(programSetup(input, 12, 2))[0];
const partTwo = binarySearch(input, 19690720, findNounAndVerb);

console.log(`Part 1: ${partOne} Part 2: ${partTwo}`);
