const fs = require("fs");
const inputCodes = fs
  .readFileSync("./input.txt", "utf-8")
  .split(",")
  .map(Number);

// //Part 1 and 2

const getOpCode = c => +(c.toString().slice(-2));
const getParam = (p, n) => +(p.toString().split("").reverse()[n]);
const applyMode = (param, c, p, n) => (param === 1 ? c[p + n] : c[c[p + n]]);
const opCodeOne = (n1, n2) => n1 + n2;
const opCodeTwo = (n1, n2) => n1 * n2;
const opCodeFive = (p, n1, n2)  => n1 !== 0 ? p = n2 : p += 3
const opCodeSix = (p, n1, n2)  => n1 === 0 ? p = n2 : p += 3
const opCodeSeven = (n1, n2) => n1 < n2 ? 1 : 0;
const opCodeEight = (n1, n2) => n1 == n2 ? 1 : 0;



const intCodeProgram = (inputCodes, test, input, pointer, output) => {
  
  code = inputCodes.slice(0);

  while (true) {
    let x = getOpCode(code[pointer]);
    let param1 = getParam(code[pointer], 2);
    let param2 = getParam(code[pointer], 3);
    let n1 = applyMode(param1, code, pointer, 1);
    let n2 = applyMode(param2, code, pointer, 2);
    let n3 = code[pointer + 3];

    if (x === 1) {
      code[n3] = opCodeOne(n1, n2);
      pointer += 4;
    } else if (x === 2) {
      code[n3] = opCodeTwo(n1, n2);
      pointer += 4;
    } else if (x === 3) {
      code[code[pointer + 1]] = input;
      pointer += 2;
    } else if (x === 4) {
      output = n1;
      pointer += 2;
    } else if (x === 99) {
      return output;
    }
    if(test === true){
      if (x === 5) {
        pointer = opCodeFive(pointer, n1, n2)
      } else if (x === 6) {
        pointer = opCodeSix(pointer, n1, n2)
      } else if (x === 7) {
        code[code[pointer + 3]] = opCodeSeven(n1, n2)
        pointer += 4;
      } else if (x === 8) {
        code[code[pointer + 3]] = opCodeEight(n1, n2)
        pointer += 4;
      }
    }
  }
};

//Log 

partOne = intCodeProgram(inputCodes, false, 1, 0, 0);
partTwo = intCodeProgram(inputCodes,true, 5, 0, 0);

console.log(`Part 1: ${partOne} Part 2: ${partTwo}`);