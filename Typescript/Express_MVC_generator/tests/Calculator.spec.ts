import { Calculator } from '../src/Calculator';

describe('calculator test', () => {
  const calculator = new Calculator();
  test('calculator.add', () => {
    expect(calculator.add(1, 2)).toEqual(3);
  });
  test('calculator.add2', () => {
    expect(calculator.add(1, 2)).toEqual(4);
  });
});
