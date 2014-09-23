/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

var should = require('should');
var ipmerge = require(__dirname + '/../');

describe('ipmerge interface test', function () {

  /* {{{ should_long2ip_works_fine() */
  it('should_long2ip_works_fine', function () {
    [{
      'num' : 0, 'str' : '0.0.0.0',
    }, {
      'num' : ipmerge.ip2long('255.255.255.255'), 'str' : '255.255.255.255'
    }, {
      'num' : -1, 'str' : '',
    }, {
      'num' : 4294967296, 'str' : ''
    }].forEach(function (row) {
      ipmerge.long2ip(row.num).should.eql(row.str);
    });

    ipmerge.ip2long('0.1.1').should.eql(-1);
  });
  /* }}} */

  /* {{{ should_merge_works_fine() */
  it('should_merge_works_fine', function () {
    ipmerge.merge([{
      's' : 3, 'e' : 6, 'p' : 1, 'd' : 'AAA',
    }, {
      's' : 1, 'e' : 8, 'p' : 2, 'd' : 'ABC',
    }, {
      's' : 24, 'e' : 26, 'p' : 1, 'd' : 'ABC',
    }, {
      's' : 9, 'e' : 22, 'p' : 3, 'd' : 'ABC',
    }]).should.eql([{
      's' : 1, 'e' : 2, 'd' : 'ABC',
    }, {
      's' : 3, 'e' : 6, 'd' : 'AAA',
    }, {
      's' : 7, 'e' : 22, 'd' : 'ABC',
    }, {
      's' : 24, 'e' : 26, 'd' : 'ABC',
    }]);
  });
  /* }}} */

  /* {{{ should_same_start_and_end_works_fine() */
  it('should_same_start_and_end_works_fine', function () {
    ipmerge.merge([{
      's' : 1, 'e' : 1, 'p' : 2, 'd' : 'AAA',
    }, {
      's' : 2, 'e' : 2, 'p' : 2, 'd' : 'AAA',
    }, {
      's' : 3, 'e' : 3, 'p' : 2, 'd' : 'AAB',
    }]).should.eql([{
      's' : 1, 'e' : 2, 'd' : 'AAA',
    }, {
      's' : 3, 'e' : 3, 'd' : 'AAB',
    }]);
  });
  /* }}} */

});

