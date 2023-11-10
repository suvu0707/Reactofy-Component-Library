"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _clsx = require("clsx");
var _core = require("@linaria/core");
var _style = require("./style");
var _utils = require("./utils");
var _SummaryCell = _interopRequireDefault(require("./SummaryCell"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const summaryRow = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.SummaryRow {\n    line-height: var(--rdg-sumary-row-height);\n\n    > .", " {\n      position: sticky;\n    }\n  }\n"])), _style.cell);
const topSummaryRow = (0, _core.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  @layer rdg.SummaryRow {\n    > .", " {\n      z-index: 1;\n    }\n\n    > .", " {\n      z-index: 2;\n    }\n  }\n"])), _style.cell, _style.cellFrozen);
const topSummaryRowBorderClassname = (0, _core.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  @layer rdg.SummaryRow {\n    > .", " {\n      border-block-end: 2px solid var(--rdg-summary-border-color);\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    }\n  }\n"])), _style.cell);
const bottomSummaryRowBorderClassname = (0, _core.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  @layer rdg.SummaryRow {\n    > .", " {\n      border-block-start: 2px solid var(--rdg-summary-border-color);\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    }\n  }\n"])), _style.cell);
const summaryRowClassname = "rdg-summary-row ".concat(summaryRow);
const topSummaryRowClassname = "rdg-top-summary-row ".concat(topSummaryRow);
function SummaryRow(_ref) {
  let {
    rowIdx,
    gridRowStart,
    row,
    viewportColumns,
    top,
    bottom,
    lastFrozenColumnIndex,
    selectedCellIdx,
    lastTopRowIdx,
    selectCell,
    "aria-rowindex": ariaRowIndex
  } = _ref;
  const cells = [];
  for (let index = 0; index < viewportColumns.length; index++) {
    const column = viewportColumns[index];
    const colSpan = (0, _utils.getColSpan)(column, lastFrozenColumnIndex, {
      type: "SUMMARY",
      row
    });
    if (colSpan !== undefined) {
      index += colSpan - 1;
    }
    const isCellSelected = selectedCellIdx === column.idx;
    cells.push( /*#__PURE__*/_react.default.createElement(_SummaryCell.default, {
      key: "".concat(column.key),
      column: column,
      colSpan: colSpan,
      row: row,
      isCellSelected: isCellSelected,
      selectCell: selectCell
    }));
  }
  const isTop = lastTopRowIdx !== undefined;
  return /*#__PURE__*/_react.default.createElement("div", {
    key: "".concat(rowIdx),
    role: "row",
    "aria-rowindex": ariaRowIndex,
    className: (0, _clsx.clsx)(_style.rowClassname, "rdg-row-summary-row-".concat(rowIdx % 2 === 0 ? "even" : "odd"), summaryRowClassname, {
      [_style.rowSelectedClassname]: selectedCellIdx === -1,
      [topSummaryRowClassname]: isTop,
      [topSummaryRowBorderClassname]: isTop && lastTopRowIdx === rowIdx,
      [bottomSummaryRowBorderClassname]: !isTop && rowIdx === 0,
      "rdg-bottom-summary-row": !isTop
    }),
    style: _objectSpread(_objectSpread({}, (0, _utils.getRowStyle)(gridRowStart)), {}, {
      "--rdg-summary-row-top": top !== undefined ? "".concat(top, "px") : undefined,
      "--rdg-summary-row-bottom": bottom !== undefined ? "".concat(bottom, "px") : undefined
    })
  }, cells);
}
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(SummaryRow);