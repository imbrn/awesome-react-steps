"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function(obj) {
        return typeof obj;
      }
    : function(obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };

exports.deepFreeze = deepFreeze;
function deepFreeze(obj) {
  if (
    obj !== undefined &&
    (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" &&
    obj !== null
  ) {
    Object.getOwnPropertyNames(obj).forEach(function(name) {
      return deepFreeze(obj[name]);
    });
    Object.freeze(obj);
  }
}
