JSON
  = _ value:Value _ {
    return value;
  }

Value
  = Object
  / Array
  / String
  / Number
  / Boolean
  / Null

Object
  = "{" _ "}" { return { type: 'ObjectExpression', properties: [] }; }
  / "{" head:(_ Property _ ",")* tail:(_ Property _) "}" {
  	return {
      type: 'ObjectExpression',
      properties: head.concat([tail]).map((element) => element[1])
    }
  }
  

Property
  = key:Key _ ":" _ value:Value {
    return {
      type: 'Property',
      key,
      value
    }
  }
  
Key
  = String

Array
  = "[" _ "]" { return { type: 'ArrayExpression', elements: [] }; }
  / "[" head:(_ Value _ ",")* tail:(_ Value _) "]" {
    return {
      type: 'ArrayExpression',
      elements: head.concat([tail]).map((element) => element[1])
    };
  }
  
String
  = "\"" string:([^"\\] / Escape)* "\"" {
  	return {
      type: 'Literal',
      value: string.join('')
    }
  }
  
Escape
  = "\\" character:["\\/bfnrt] {
    switch (character) {
      case '"':
      case '\\':
      case '/':
        return character;
      case 'b': return '\b';
      case 'f': return '\f';
      case 'n': return '\n';
      case 'r': return '\r';
      case 't': return '\t';
    }
  }
  / "\\u" codePoint:([0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]) {
    return String.fromCodePoint(parseInt(codePoint.join(''), 16));
  }

Number
  = "-"? ("0" / ([1-9] [0-9]*)) ("." [0-9]+)? (("e" / "E") ("+" / "-")? [0-9]+)? {
    return {
      type: 'Literal',
      value: parseFloat(text())
    };
  }

Boolean
  = "true" { return { type: 'Literal', value: true }; }
  / "false" { return { type: 'Literal', value: false }; }

Null
  = "null" { return { type: 'Literal', value: null }; }

_ "whitespace"
  = [ \t\n\r]*