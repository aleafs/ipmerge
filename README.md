[![Build Status](https://travis-ci.org/aleafs/ipmerge.svg?branch=master)](https://travis-ci.org/aleafs/ipmerge)
[![Coverage Status](https://coveralls.io/repos/aleafs/ipmerge/badge.png?branch=master)](https://coveralls.io/r/aleafs/ipmerge?branch=master)

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
	{'s' : 7, 'e' : 30, 'd' : 'ABB'}
]

```

## License

MIT

