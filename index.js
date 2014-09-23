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

/**
 *
 * [{'s' : 1, 'e' : 2, 'p' : 1, 'd' : 'aa' }], 前闭后闭
 */
exports.merge = function (temp, step) {
  step = parseInt(step, 10);
  if (!step || step < 1) {
    step = 1;
  }

  var data = [];
  temp.forEach(function (row) {
    data.push({
      's' : row.s, 'e' : row.e, 'p' : row.p, 'd' : row.d,
    }, {
      's' : row.e + step, 'e' : -1, 'p' : row.p, 'd' : null,
    });
  });

  data.sort(function (a, b) {
    return a.s - b.s;
  });

  var dset = [];
  var mile = [];
  var last = {};

  var writeLast = function (o, e) {
    if (o && null !== o.d && undefined !== o.d) {
      dset.push({
        's' : o.s,
        'e' : e || o.e,
        'd' : o.d,
      });
    }
  };

  data.forEach(function (row) {

    if (null !== row.d) {
      mile.push(row);
    }

    var t = [];
    var v = {'d' : null};
    for (var i = 0; i < mile.length; i++) {
      if (mile[i].s <= row.s && mile[i].e > row.s) {
        t.push(mile[i]);
        if (null === v.d || mile[i].p < v.p) {
          v = mile[i];
        }
      }
    }
    mile = t;

    if (null === v.d || v.d !== last.d) {
      writeLast(last, row.s - step);
      if (null !== v.d) {
        last = {
          's' : Math.max(v.s, row.s),
          'e' : Math.max(v.e, row.e),
          'd' : v.d,
        };
      } else {
        last = row;
      }
    }
  });
  writeLast(last);

  return dset;
};

