import jsonAstParser from '../dist/json-ast-parser';
const { parse } = jsonAstParser;

const Node = (type, properties) => ({ type, ...properties });
const Literal = (value) => Node('Literal', { value });
const ArrayExpression = (elements) => Node('ArrayExpression', { elements });
const ObjectExpression = (properties) =>
  Node('ObjectExpression', {
    properties: Object.keys(properties)
      .map(key => Property(key, properties[key]))
  });
const Property = (key, value) => Node('Property', {
  key: Literal(key),
  value
});

test('parse number', () => {
  expect(parse('12')).toEqual(Literal(12));
  expect(parse('-1')).toEqual(Literal(-1));
  expect(parse('12.34')).toEqual(Literal(12.34));
  expect(parse('12.34e5')).toEqual(Literal(12.34e5));
  expect(parse('12.34e-5')).toEqual(Literal(12.34e-5));
})

test('parse string', () => {
  expect(parse(JSON.stringify('s'))).toEqual(Literal('s'));
  expect(parse(JSON.stringify("string"))).toEqual(Literal('string'));
  expect(parse(JSON.stringify('1'))).toEqual(Literal('1'));
  expect(parse(JSON.stringify('1"23'))).toEqual(Literal('1"23'));
  expect(parse(JSON.stringify('\" \\ \/ \b \f \n \r \t'))).toEqual(Literal('\" \\ \/ \b \f \n \r \t'));
  expect(parse(('"\\u54c8\\u54C8"'))).toEqual(Literal('哈哈'));
})

test('parse boolean', () => {
  expect(parse('true')).toEqual(Literal(true));
  expect(parse(' false ')).toEqual(Literal(false));
})

test('parse null', () => {
  expect(parse('null')).toEqual(Literal(null));
})

test('parse array', () => {
  expect(parse(JSON.stringify([]))).toEqual(ArrayExpression([]));
  expect(parse(JSON.stringify([1]))).toEqual(ArrayExpression([Literal(1)]));
  expect(parse(JSON.stringify([1, 2, 3]))).toEqual(ArrayExpression([Literal(1), Literal(2), Literal(3)]));
  expect(parse(JSON.stringify([true, [false, [null]]])))
    .toEqual(ArrayExpression([
      Literal(true),
      ArrayExpression([
        Literal(false),
        ArrayExpression([
          Literal(null)
        ])
      ])
    ]));
})

test('parse object', () => {
  expect(parse(JSON.stringify({}))).toEqual(ObjectExpression([]));
  expect(parse(JSON.stringify({ a: null }))).toEqual(ObjectExpression({ a: Literal(null) }));
  expect(parse(JSON.stringify({ a: 1, b: 2 }))).toEqual(ObjectExpression({ a: Literal(1), b: Literal(2) }));
  expect(parse(JSON.stringify({ a: { b:  { c: 'd' } } })))
    .toEqual(ObjectExpression({
      a: ObjectExpression({
        b: ObjectExpression({
          c: Literal('d')
        })
      })
    }));
})

