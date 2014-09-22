/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

exports.long2ip = function (n) {
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
exports.merge = function (data, step) {
  step = parseInt(step, 10);
  if (!step || step < 1) {
    step = 1;
  }

  data = data.sort(function (a, b) {
    return a.s - b.s;
  });

  var dset = [];
  var last = null;

  data.forEach(function (row) {
    if (!last) {
      last = row;
    } else if (row.s > last.e + step) {    /**<  连续轴上断掉  */
      dset.push(last);
      last = row;
    } else {
      if (row.p < last.p && row.d != last.d) {
        last.e = row.s - step;
        dset.push(last);
        last = row;
      } else {
        last.e = row.e;
        last.p = Math.min(last.p, row.p);
      }
    }
  });

  if (last) {
    dset.push(last);
  }

  return dset;
};

