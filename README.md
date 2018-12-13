# peg-json-parser
A JSON Parser based on PEG.js

### Install
```sh
# yarn
$ yarn add peg-json-parser

# or npm
$ npm install peg-json-parser --save
```

### Usage

```js
import { parse, astParse } from 'peg-json-parser';

// like JSON.parse()
parse('{"some": "json"}');

// return ESTree
astParse('{"some": "json"}');
```

