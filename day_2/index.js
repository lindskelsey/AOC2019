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

const findNounAndVerb = (input, end) => {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      let inputCopy = input.slice(0);
      const setup = programSetup(inputCopy, noun, verb);
      const program = intCodeProgram(setup);
      if (program[0] === end) {
        return 100 * noun + verb;
      }
    }
  }
};

//Log

const partOne = intCodeProgram(programSetup(input, 12, 2))[0];
const partTwo = findNounAndVerb(input, 19690720);

console.log(`Part 1: ${partOne} Part 2: ${partTwo}`);
