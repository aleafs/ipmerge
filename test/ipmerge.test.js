/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

var should = require('should');
var ipmerge = require(__dirname + '/../');

describe('ipmerge interface test', function () {

  /* {{{ should_long2ip_works_fine() */
  it('should_long2ip_works_fine', function () {
    [{
      'num' : 0, 'str' : '0.0.0.0'
    }, {
      'num' : 4294967295, 'str' : '255.255.255.255'
    }, {
      'num' : -1, 'str' : '',
    }, {
      'num' : 4294967296, 'str' : ''
    }].forEach(function (row) {
      ipmerge.long2ip(row.num).should.eql(row.str);
    });
  });
  /* }}} */

  it('should_merge_works_fine', function () {
    ipmerge.merge([{
      's' : 3, 'e' : 6, 'p' : 1, 'd' : 'AAA',
    }, {
      's' : 1, 'e' : 8, 'p' : 2, 'd' : 'ABC',
    }, {
      's' : 9, 'e' : 22, 'p' : 3, 'd' : 'ABC',
    }]).should.eql([{
      's' : 1, 'e' : 2, 'd' : 'ABC',
    }, {
      's' : 3, 'e' : 6, 'd' : 'AAA',
    }, {
      's' : 7, 'e' : 8, 'd' : 'ABC',
    }, {
      's' : 9, 'e' : 22, 'd' : 'ABC',
    }]);
  });

});

