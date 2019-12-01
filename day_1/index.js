const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const masses = input.split("\n").map(Number);

//Part 1

const totalFuel = masses
  .map(mass => {
    return Math.floor(mass / 3) - 2;
  })
  .reduce((a, b) => a + b, 0);

console.log(totalFuel);

//Part 2

const calculateFuel = mass => {
  const fuel = Math.floor(mass / 3) - 2;
  return fuel > 0 ? fuel + calculateFuel(fuel) : 0;
};

const totalFuel2 = masses.map(calculateFuel).reduce((a, b) => a + b);

console.log(totalFuel2);
