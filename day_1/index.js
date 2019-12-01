const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const masses = input.split("\n").map(Number);
const getFuel = mass => Math.floor(mass / 3) - 2;
const sum = (a, b) => a + b;

//Part 1

const totalPart1 = masses.map(getFuel).reduce(sum);

//Part 2

const calculateFuel = mass => {
  const fuel = getFuel(mass);
  return fuel > 0 ? fuel + calculateFuel(fuel) : 0;
};

const totalPart2 = masses.map(calculateFuel).reduce(sum);

//Log

console.log(`Part 1: ${totalPart1} Part 2: ${totalPart2}`);
