#!/usr/bin/env node

/**
 * Basic calculator operations supported by this CLI:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 */

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }

  return a / b;
}

function normalizeOperation(operation) {
  const operations = {
    add: 'addition',
    addition: 'addition',
    '+': 'addition',
    subtract: 'subtraction',
    subtraction: 'subtraction',
    '-': 'subtraction',
    multiply: 'multiplication',
    multiplication: 'multiplication',
    x: 'multiplication',
    '*': 'multiplication',
    divide: 'division',
    division: 'division',
    '/': 'division',
  };

  return operations[operation];
}

function parseNumber(value, label) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid ${label}: "${value}" is not a number.`);
  }

  return parsedValue;
}

function calculate(operation, a, b) {
  switch (normalizeOperation(operation)) {
    case 'addition':
      return addition(a, b);
    case 'subtraction':
      return subtraction(a, b);
    case 'multiplication':
      return multiplication(a, b);
    case 'division':
      return division(a, b);
    default:
      throw new Error(
        `Unsupported operation "${operation}". Use +, -, *, /, add, subtract, multiply, or divide.`
      );
  }
}

function getUsageText() {
  return [
    'Usage: node src/calculator.js <operation> <number1> <number2>',
    'Supported operations: addition (+), subtraction (-), multiplication (*), division (/)',
    'Examples:',
    '  node src/calculator.js + 7 3',
    '  node src/calculator.js divide 12 4',
  ].join('\n');
}

function runCli(argv = process.argv.slice(2)) {
  if (argv.length !== 3) {
    throw new Error(getUsageText());
  }

  const [operation, rawA, rawB] = argv;
  const a = parseNumber(rawA, 'first number');
  const b = parseNumber(rawB, 'second number');
  const result = calculate(operation, a, b);

  console.log(result);
  return result;
}

if (require.main === module) {
  try {
    runCli();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
  runCli,
};
