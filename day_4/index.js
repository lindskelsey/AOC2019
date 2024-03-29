// Setup

const parse = (a, b) => Array.from(new Array(b - a), (_, i) => i + a).map(String);

const [start, end] = [178416, 676461];
const passwords = parse(start, end);

// Part 1

const checkDouble = pass => pass.match(/(.)\1+/g);

const checkIncrease = pass => pass.match(/^0*1*2*3*4*5*6*7*8*9*$/);

const partOne = passwords.filter(pass => checkIncrease(pass) && checkDouble(pass));

// Part 2

const checkDup = dups => dups.filter(dup => dup.length === 2)

const partTwo = partOne.filter(pass => checkDup(checkDouble(pass)).length > 0)

// Log

console.log(`Part 1: ${partOne.length} Part 2: ${partTwo.length}`);
