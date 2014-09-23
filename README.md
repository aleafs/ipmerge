[![Build Status](https://secure.travis-ci.org/aleafs/ipmerge.png?branch=master)](http://travis-ci.org/aleafs/ipmerge)
[![Coverage Status](https://coveralls.io/repos/aleafs/ipmerge/badge.png)](https://coveralls.io/r/aleafs/ipmerge)

## About

`ipmerge` is a simple library to tidy and merge range dataset (such as ip table) to one.

## Usage

```javascript

var ipmerge = require('ipmerge');

console.log(ipmerge.merge([{
  's' : 1, 'e' : 10, 'p' : 3, 'd' : 'ABC'
}, {
  's' : 7, 'e' : 20, 'p' : 2, 'd' : 'ABB'
}, {
  's' : 21, 'e' : 30, 'p' : 4, 'd' : 'ABB'
}], 1));

```

```bash

[
	{'s' : 1, 'e' : 6, 'd' : 'ABC'},
	{'s' : 7, 'e' : 30, 'd' : 'AAA'}
]

```

## License

MIT

