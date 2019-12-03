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
    if (code[i] === 1) {
      code[code[i + 3]] = opCodeOne(code[code[i + 1]], code[code[i + 2]]);
    } else if (code[i] === 2) {
      code[code[i + 3]] = opCodeTwo(code[code[i + 1]], code[code[i + 2]]);
    } else if (code[i] === 99) {
      return code;
    } else {
      continue;
    }
  }
  return code;
};

//Part 2

const findNounAndVerb = input => {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      let inputCopy = input.slice(0);
      const setup = programSetup(inputCopy, noun, verb);
      const program = intCodeProgram(setup);
      if (program[0] === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
};

//Log

const partOne = intCodeProgram(programSetup(input, 12, 2))[0];
const partTwo = findNounAndVerb(input);

console.log(`Part 1: ${partOne} Part 2: ${partTwo}`);
