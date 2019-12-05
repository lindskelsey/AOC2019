// Setup

const parse = (a, b) => Array.from(new Array(b - a), (_, i) => i + a).map(String);

const [start, end] = [178416, 676461];
const passwords = parse(start, end);

const checkDouble = p => p.match(/(.)\1+/g);
const checkIncrease = p => p.match(/^0*1*2*3*4*5*6*7*8*9*$/);

// Part 1

const partOne = passwords.filter(p => checkIncrease(p) && checkDouble(p));

// Part 2

const checkDup = p => p.filter(dup => dup.length === 2)

const partTwo = partOne.filter(pass => checkDup(checkDouble(pass)).length > 0)

// Log

console.log(`Part 1: ${partOne.length} Part 2: ${partTwo.length}`);
