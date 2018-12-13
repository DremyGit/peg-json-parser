import jsonAstParser from '../dist/json-ast-parser';
import jsonValueParser from '../dist/json-value-parser';

const parse = jsonValueParser.parse;
const astParse = jsonAstParser.parse;

export default {
  parse,
  astParse,
}

export {
  parse,
  astParse,
}
