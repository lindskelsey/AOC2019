const fs = require("fs");
const inputs = fs.readFileSync("./input.txt", "utf-8").split("\n");

//Part 1 and 2

const wire1 = inputs[0].split(",");
const wire2 = inputs[1].split(",");

const operations = {
  U: { x: 0, y: 1 },
  D: { x: 0, y: -1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 }
};

let wireCoords = new Map();
let wireSteps = new Map();
let distances = [];
let allSteps = [];

const distance = (a, b) => Math.abs(a) + Math.abs(b);

const buildCoords = (x, y) => {
  wireCoords[x + " " + y] = 1;
};
const checkCoords = (x, y) => {
  if (wireCoords[x + " " + y] == 1) {
    distances.push(distance(x, y));
  }
};

const buildSteps = (x, y, steps) => {
  if (!wireSteps[x + " " + y]) wireSteps[x + " " + y] = steps;
};

const addSteps = (x, y, steps) => {
  if (wireCoords[x + " " + y] == 1) {
    allSteps.push(wireSteps[x + " " + y] + steps);
  }
};

const checkWire = (wire, fn, fn2) => {
  let [x, y, steps] = [0, 0, 0];
  wire.map(point => {
    let length = parseInt(point.substring(1));
    let move = operations[point[0]];
    for (var i = 0; i < length; i++) {
      steps++, (x += move.x), (y += move.y);
      fn(x, y);
      fn2(x, y, steps);
    }
  });
};

// Log

checkWire(wire1, buildCoords, buildSteps);
checkWire(wire2, checkCoords, addSteps);
const partOne = Math.min.apply(Math, distances);
const partTwo = Math.min.apply(Math, allSteps);

console.log(`Part 1: ${partOne} Part 2: ${partTwo}`);
