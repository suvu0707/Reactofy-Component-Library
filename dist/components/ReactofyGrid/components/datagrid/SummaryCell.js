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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const summaryCellClassname = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.SummaryCell {\n    inset-block-start: var(--rdg-summary-row-top);\n    inset-block-end: var(--rdg-summary-row-bottom);\n  }\n"])));
exports.summaryCellClassname = summaryCellClassname;
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
var _default = /*#__PURE__*/(0, _react.memo)(SummaryCell);
exports.default = _default;