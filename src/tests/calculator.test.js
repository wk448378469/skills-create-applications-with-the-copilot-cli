const test = require('node:test');
const assert = require('node:assert/strict');

const {
  addition,
  subtraction,
  multiplication,
  division,
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
});

test('calculate rejects unsupported operations', () => {
  assert.throws(
    () => calculate('modulo', 8, 2),
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
    /Usage: node src\/calculator\.js <operation> <number1> <number2>/
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
