const test = require('node:test');
const assert = require('node:assert/strict');

const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
  runCli,
} = require('../calculator');

test('addition returns the sum of two numbers', () => {
  assert.equal(addition(2, 3), 5);
  assert.equal(addition(-4, 10), 6);
  assert.equal(addition(1.5, 2.5), 4);
});

test('subtraction returns the difference of two numbers', () => {
  assert.equal(subtraction(10, 4), 6);
  assert.equal(subtraction(4, 10), -6);
  assert.equal(subtraction(5.5, 2.2), 3.3);
});

test('multiplication returns the product of two numbers', () => {
  assert.equal(multiplication(45, 2), 90);
  assert.equal(multiplication(-3, 5), -15);
  assert.equal(multiplication(0, 99), 0);
});

test('division returns the quotient of two numbers', () => {
  assert.equal(division(20, 5), 4);
  assert.equal(division(9, 2), 4.5);
  assert.equal(division(-12, 3), -4);
});

test('division throws a clear error when dividing by zero', () => {
  assert.throws(
    () => division(10, 0),
    /Division by zero is not allowed\./
  );
});

test('modulo returns the remainder of a division', () => {
  assert.equal(modulo(10, 3), 1);
  assert.equal(modulo(20, 5), 0);
  assert.equal(modulo(-10, 3), -1);
});

test('modulo throws a clear error when dividing by zero', () => {
  assert.throws(
    () => modulo(10, 0),
    /Modulo by zero is not allowed\./
  );
});

test('power returns the base raised to the exponent', () => {
  assert.equal(power(2, 5), 32);
  assert.equal(power(9, 0.5), 3);
  assert.equal(power(7, 0), 1);
});

test('squareRoot returns the square root of a non-negative number', () => {
  assert.equal(squareRoot(81), 9);
  assert.equal(squareRoot(0), 0);
  assert.equal(squareRoot(2.25), 1.5);
});

test('squareRoot throws a clear error for negative numbers', () => {
  assert.throws(
    () => squareRoot(-1),
    /Square root of a negative number is not allowed\./
  );
});

test('calculate supports the example operations shown in the image', () => {
  assert.equal(calculate('+', 2, 3), 5);
  assert.equal(calculate('-', 10, 4), 6);
  assert.equal(calculate('*', 45, 2), 90);
  assert.equal(calculate('/', 20, 5), 4);
});

test('calculate supports named operations', () => {
  assert.equal(calculate('addition', 8, 2), 10);
  assert.equal(calculate('subtraction', 8, 2), 6);
  assert.equal(calculate('multiplication', 8, 2), 16);
  assert.equal(calculate('division', 8, 2), 4);
  assert.equal(calculate('modulo', 8, 3), 2);
  assert.equal(calculate('power', 2, 4), 16);
  assert.equal(calculate('squareRoot', 81), 9);
});

test('calculate supports the extended operations shown in the image', () => {
  assert.equal(calculate('%', 5, 2), 1);
  assert.equal(calculate('^', 2, 3), 8);
  assert.equal(calculate('sqrt', 16), 4);
});

test('calculate rejects unsupported operations', () => {
  assert.throws(
    () => calculate('cube', 8, 2),
    /Unsupported operation/
  );
});

test('runCli returns the computed result for valid arguments', () => {
  const loggedValues = [];
  const originalLog = console.log;

  console.log = (value) => {
    loggedValues.push(value);
  };

  try {
    const result = runCli(['+', '7', '3']);

    assert.equal(result, 10);
    assert.deepEqual(loggedValues, [10]);
  } finally {
    console.log = originalLog;
  }
});

test('runCli validates argument count', () => {
  assert.throws(
    () => runCli(['+', '7']),
    /Usage:/
  );
});

test('runCli validates numeric input', () => {
  assert.throws(
    () => runCli(['+', 'seven', '3']),
    /Invalid first number/
  );
});

test('runCli surfaces division by zero errors', () => {
  assert.throws(
    () => runCli(['/', '10', '0']),
    /Division by zero is not allowed\./
  );
});

test('runCli supports modulo and power operations', () => {
  const loggedValues = [];
  const originalLog = console.log;

  console.log = (value) => {
    loggedValues.push(value);
  };

  try {
    assert.equal(runCli(['%', '10', '3']), 1);
    assert.equal(runCli(['^', '2', '5']), 32);
    assert.deepEqual(loggedValues, [1, 32]);
  } finally {
    console.log = originalLog;
  }
});

test('runCli supports the extended image examples', () => {
  const loggedValues = [];
  const originalLog = console.log;

  console.log = (value) => {
    loggedValues.push(value);
  };

  try {
    assert.equal(runCli(['%', '5', '2']), 1);
    assert.equal(runCli(['^', '2', '3']), 8);
    assert.equal(runCli(['sqrt', '16']), 4);
    assert.deepEqual(loggedValues, [1, 8, 4]);
  } finally {
    console.log = originalLog;
  }
});

test('runCli supports square root as a single-operand operation', () => {
  const loggedValues = [];
  const originalLog = console.log;

  console.log = (value) => {
    loggedValues.push(value);
  };

  try {
    assert.equal(runCli(['sqrt', '81']), 9);
    assert.deepEqual(loggedValues, [9]);
  } finally {
    console.log = originalLog;
  }
});

test('runCli surfaces square root errors for negative numbers', () => {
  assert.throws(
    () => runCli(['sqrt', '-9']),
    /Square root of a negative number is not allowed\./
  );
});
