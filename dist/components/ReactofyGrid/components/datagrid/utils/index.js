"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  min: true,
  max: true,
  round: true,
  floor: true,
  sign: true,
  abs: true,
  assertIsValidKeyGetter: true,
  clampColumnWidth: true
};
exports.abs = void 0;
exports.assertIsValidKeyGetter = assertIsValidKeyGetter;
exports.clampColumnWidth = clampColumnWidth;
exports.sign = exports.round = exports.min = exports.max = exports.floor = void 0;
var _colSpanUtils = require("./colSpanUtils");
Object.keys(_colSpanUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _colSpanUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _colSpanUtils[key];
    }
  });
});
var _domUtils = require("./domUtils");
Object.keys(_domUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _domUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _domUtils[key];
    }
  });
});
var _keyboardUtils = require("./keyboardUtils");
Object.keys(_keyboardUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _keyboardUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _keyboardUtils[key];
    }
  });
});
var _renderMeasuringCells = require("./renderMeasuringCells");
Object.keys(_renderMeasuringCells).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _renderMeasuringCells[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _renderMeasuringCells[key];
    }
  });
});
var _selectedCellUtils = require("./selectedCellUtils");
Object.keys(_selectedCellUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _selectedCellUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _selectedCellUtils[key];
    }
  });
});
var _styleUtils = require("./styleUtils");
Object.keys(_styleUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _styleUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _styleUtils[key];
    }
  });
});
const {
  min,
  max,
  round,
  floor,
  sign,
  abs
} = Math;
exports.abs = abs;
exports.sign = sign;
exports.floor = floor;
exports.round = round;
exports.max = max;
exports.min = min;
function assertIsValidKeyGetter(keyGetter) {
  if (typeof keyGetter !== "function") {
    throw new Error("Please specify the rowKeyGetter prop to use selection");
  }
}
function clampColumnWidth(width, _ref) {
  let {
    minWidth,
    maxWidth
  } = _ref;
  width = max(width, minWidth);

  // ignore maxWidth if it less than minWidth
  if (typeof maxWidth === "number" && maxWidth >= minWidth) {
    return min(width, maxWidth);
  }
  return width;
}