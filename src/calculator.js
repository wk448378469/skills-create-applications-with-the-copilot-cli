#!/usr/bin/env node

/**
 * Calculator operations supported by this CLI:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - power
 * - square root
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

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }

  return Math.sqrt(n);
}

function normalizeOperation(operation) {
  const normalizedOperation = String(operation).toLowerCase();
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
    mod: 'modulo',
    modulo: 'modulo',
    '%': 'modulo',
    power: 'power',
    pow: 'power',
    exponentiation: 'power',
    '^': 'power',
    '**': 'power',
    sqrt: 'squareRoot',
    squareroot: 'squareRoot',
    'square-root': 'squareRoot',
    'square_root': 'squareRoot',
    '√': 'squareRoot',
  };

  return operations[normalizedOperation];
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
    case 'modulo':
      return modulo(a, b);
    case 'power':
      return power(a, b);
    case 'squareRoot':
      return squareRoot(a);
    default:
      throw new Error(
        `Unsupported operation "${operation}". Use +, -, *, /, %, ^, sqrt, add, subtract, multiply, divide, modulo, power, or squareRoot.`
      );
  }
}

function getUsageText() {
  return [
    'Usage:',
    '  node src/calculator.js <operation> <number1> <number2>',
    '  node src/calculator.js <operation> <number>',
    'Supported operations: addition (+), subtraction (-), multiplication (*), division (/), modulo (%), power (^), square root (sqrt)',
    'Examples:',
    '  node src/calculator.js + 7 3',
    '  node src/calculator.js divide 12 4',
    '  node src/calculator.js % 10 3',
    '  node src/calculator.js ^ 2 5',
    '  node src/calculator.js sqrt 81',
  ].join('\n');
}

function runCli(argv = process.argv.slice(2)) {
  if (argv.length < 2 || argv.length > 3) {
    throw new Error(getUsageText());
  }

  const [operation, ...rawOperands] = argv;
  const normalizedOperation = normalizeOperation(operation);

  if (!normalizedOperation) {
    throw new Error(
      `Unsupported operation "${operation}". Use +, -, *, /, %, ^, sqrt, add, subtract, multiply, divide, modulo, power, or squareRoot.`
    );
  }

  const requiresOneOperand = normalizedOperation === 'squareRoot';

  if (
    (requiresOneOperand && rawOperands.length !== 1) ||
    (!requiresOneOperand && rawOperands.length !== 2)
  ) {
    throw new Error(getUsageText());
  }

  const a = parseNumber(
    rawOperands[0],
    requiresOneOperand ? 'number' : 'first number'
  );
  const b = requiresOneOperand
    ? undefined
    : parseNumber(rawOperands[1], 'second number');
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
  modulo,
  power,
  squareRoot,
  calculate,
  runCli,
};
