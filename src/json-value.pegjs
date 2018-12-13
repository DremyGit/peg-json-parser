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
  = "{" _ "}" { return {}; }
  / "{" head:(_ Property _ ",")* tail:(_ Property _) "}" {
  	return head.concat([tail])
      .map((element) => element[1])
      .reduce((result, [key, value]) => {
        result[key] = value
        return result;
      }, {});
  }
  
Property
  = key:Key _ ":" _ value:Value {
    return [ key, value ];
  }
  
Key
  = String

Array
  = "[" _ "]" { return []; }
  / "[" head:(_ Value _ ",")* tail:(_ Value _) "]" {
    return head.concat([tail])
      .map((element) => element[1]);
  }
  
String
  = "\"" string:([^"\\] / Escape)* "\"" {
  	return string.join('');
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
    return parseFloat(text())
  }

Boolean
  = "true" { return true; }
  / "false" { return false; }

Null
  = "null" { return null; }

_ "whitespace"
  = [ \t\n\r]*
              