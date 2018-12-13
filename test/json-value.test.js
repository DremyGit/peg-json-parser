import parser from '../dist/json-value-parser';

const parse = parser.parse;

test('parse number', () => {
  expect(parse('12')).toBe(12);
  expect(parse('-1')).toBe(-1);
  expect(parse('12.34')).toBe(12.34);
  expect(parse('12.34e5')).toBe(12.34e5);
  expect(parse('12.34e-5')).toBe(12.34e-5);
})

test('parse string', () => {
  expect(parse(JSON.stringify('s'))).toBe('s');
  expect(parse(JSON.stringify("string"))).toBe('string');
  expect(parse(JSON.stringify('1'))).toBe('1');
  expect(parse(JSON.stringify('1"23'))).toBe('1"23');
  expect(parse(JSON.stringify('\" \\ \/ \b \f \n \r \t'))).toBe('\" \\ \/ \b \f \n \r \t');
  expect(parse(('"\\u54c8\\u54C8"'))).toBe('哈哈');
})

test('parse boolean', () => {
  expect(parse('true')).toBe(true);
  expect(parse(' false ')).toBe(false);
})

test('parse null', () => {
  expect(parse('null')).toBeNull();
})

test('parse array', () => {
  expect(parse(JSON.stringify([]))).toEqual([]);
  expect(parse(JSON.stringify([1]))).toEqual([1]);
  expect(parse(JSON.stringify([1, 2, 3]))).toEqual([1, 2, 3]);
  expect(parse(JSON.stringify([true, [false, [null]]]))).toEqual([true, [false, [null]]]);
})

test('parse object', () => {
  expect(parse(JSON.stringify({}))).toEqual({});
  expect(parse(JSON.stringify({ a: null }))).toEqual({ a: null });
  expect(parse(JSON.stringify({ a: 1, b: 2 }))).toEqual({ a: 1, b: 2 });
  expect(parse(JSON.stringify({ a: { b:  { c: 'd' } } }))).toEqual({ a: { b:  { c: 'd' } } });
})
