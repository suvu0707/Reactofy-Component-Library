"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.summaryCellClassname = exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@linaria/core");
var _utils = require("./utils");
var _useRovingCellRef = require("./hooks/useRovingCellRef");
var _templateObject;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const summaryCellClassname = exports.summaryCellClassname = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.SummaryCell {\n    inset-block-start: var(--rdg-summary-row-top);\n    inset-block-end: var(--rdg-summary-row-bottom);\n  }\n"])));
function SummaryCell(_ref) {
  var _column$summaryFormat;
  let {
    column,
    colSpan,
    row,
    isCellSelected,
    selectCell
  } = _ref;
  const {
    ref,
    tabIndex,
    onFocus
  } = (0, _useRovingCellRef.useRovingCellRef)(isCellSelected);
  const {
    summaryCellClass
  } = column;
  const className = (0, _utils.getCellClassname)(column, summaryCellClassname, "rdg-summary-column-".concat(column.idx % 2 === 0 ? "even" : "odd"), typeof summaryCellClass === "function" ? summaryCellClass(row) : summaryCellClass);
  function onClick() {
    selectCell(row, column);
  }
  return (
    /*#__PURE__*/
    // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    _react.default.createElement("div", {
      role: "gridcell",
      "aria-colindex": column.idx + 1,
      "aria-colspan": colSpan,
      "aria-selected": isCellSelected,
      ref: ref,
      tabIndex: tabIndex,
      className: className,
      style: (0, _utils.getCellStyle)(column, colSpan),
      onClick: onClick,
      onFocus: onFocus
    }, (_column$summaryFormat = column.summaryFormatter) === null || _column$summaryFormat === void 0 ? void 0 : _column$summaryFormat.call(column, {
      column,
      row,
      isCellSelected
    }))
  );
}
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(SummaryCell);