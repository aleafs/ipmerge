/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

exports.long2ip = function (n) {
  if (n < 0 || n > 4294967295) {
    return '';
  }

  var dot = [0, 0, 0, 0];
  return dot.map(function (v, i) {
    var k = Math.pow(256, 3 - i);
    var s = parseInt(n / k, 10);
    n = n % k;

    return s;
  }).join('.');
};

exports.ip2long = function (s) {
  var sec = String(s).split('.');
  if (!sec || sec.length < 4) {
    return -1;
  }

  return [16777216, 65536, 256, 1].reduce(function (s, t, p) {
    return s + t * (sec[p] - 0);
  }, 0);
};

/**
 *
 * [{'s' : 1, 'e' : 2, 'p' : 1, 'd' : 'aa' }], 前闭后闭
 */
exports.merge = function (data, step) {
  step = parseInt(step, 10);
  if (!step || step < 1) {
    step = 1;
  }

  var tpos = {};
  data.forEach(function (row) {
    tpos[row.s] = 1;
    tpos[row.e + 1] = 1;
  });

  data.sort(function (a, b) {
    return a.s - b.s;
  });

  var doffs = 0;
  var cache = [];
  var stack = {};
  var ipset = [];

  /* {{{ function findValue() */
  var findValue = function (start) {
    var match = {'d' : null};
    for (var i = doffs; i < data.length; i++) {
      if (data[i].s > start) {
        doffs = i;
        break;
      }

      if (data[i].e >= start) {
        cache.push(data[i]);
      }
    }

    var _temp = [];
    cache.forEach(function (row) {
      if (row.s <= start && row.e >= start) {
        _temp.push(row);
        if (null === match.d || row.p < match.p) {
          match = row;
        }
      }
    });
    cache = _temp;

    return match;
  };
  /* }}} */

  /* {{{ function writeLast() */
  var writeLast = function (o, e) {
    if (o && null !== o.d && undefined !== o.d) {
      ipset.push({
        's' : o.s,
        'e' : e || o.e,
        'd' : o.d,
      });
    }
  };
  /* }}} */

  Object.keys(tpos).sort(function (a, b) {
    return a - b;
  }).forEach(function (start) {

    start = start - 0;
    var match = findValue(start);
    if (match.d !== stack.d) {
      writeLast(stack, start - step);
      stack = {
        's' : start, 'e' : match.e, 'd' : match.d,
      };
    }
  });
  writeLast(stack);

  return ipset;
};

