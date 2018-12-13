"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.astParse = exports.parse = exports.default = void 0;

var _jsonAstParser = _interopRequireDefault(require("../dist/json-ast-parser"));

var _jsonValueParser = _interopRequireDefault(require("../dist/json-value-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parse = _jsonValueParser.default.parse;
exports.parse = parse;
var astParse = _jsonAstParser.default.parse;
exports.astParse = astParse;
var _default = {
  parse: parse,
  astParse: astParse
};
exports.default = _default;