"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCalculatedRowColumns = useCalculatedRowColumns;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
var _react = _interopRequireWildcard(require("react"));
var _formatters = require("../formatters");
var _textEditor = require("../editors/textEditor");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // import { SELECT_COLUMN_KEY } from "../Columns";
// import { clampColumnWidth, max, min } from "../utils";
// import { checkboxFormatter } from "../formatters";
const DEFAULT_COLUMN_WIDTH = "auto";
const DEFAULT_COLUMN_MIN_WIDTH = 40;
function useCalculatedRowColumns(_ref) {
  var _defaultColumnOptions, _defaultColumnOptions2, _defaultColumnOptions3, _defaultColumnOptions4, _defaultColumnOptions5, _defaultColumnOptions6, _defaultColumnOptions7;
  let {
    columns4,
    defaultColumnOptions,
    rawGroupBy,
    frameworkComponents,
    colSpanColumns
  } = _ref;
  const defaultWidth = (_defaultColumnOptions = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.width) !== null && _defaultColumnOptions !== void 0 ? _defaultColumnOptions : DEFAULT_COLUMN_WIDTH;
  const defaultMinWidth = (_defaultColumnOptions2 = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.minWidth) !== null && _defaultColumnOptions2 !== void 0 ? _defaultColumnOptions2 : DEFAULT_COLUMN_MIN_WIDTH;
  const defaultMaxWidth = (_defaultColumnOptions3 = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.maxWidth) !== null && _defaultColumnOptions3 !== void 0 ? _defaultColumnOptions3 : undefined;
  const defaultFormatter = (_defaultColumnOptions4 = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.formatter) !== null && _defaultColumnOptions4 !== void 0 ? _defaultColumnOptions4 : _formatters.valueFormatter;
  const defaultSortable = (_defaultColumnOptions5 = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.sortable) !== null && _defaultColumnOptions5 !== void 0 ? _defaultColumnOptions5 : false;
  const defaultResizable = (_defaultColumnOptions6 = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.resizable) !== null && _defaultColumnOptions6 !== void 0 ? _defaultColumnOptions6 : false;
  const defaultFilter = (_defaultColumnOptions7 = defaultColumnOptions === null || defaultColumnOptions === void 0 ? void 0 : defaultColumnOptions.dilter) !== null && _defaultColumnOptions7 !== void 0 ? _defaultColumnOptions7 : false;
  const {
    columns5
  } = (0, _react.useMemo)(() => {
    // Filter rawGroupBy and ignore keys that do not match the columns prop
    const groupBy = [];
    let lastFrozenColumnIndex = -1;
    const columns5 = columns4 === null || columns4 === void 0 ? void 0 : columns4.map((rawColumn, pos) => {
      var _rawGroupBy$includes, _rawColumn$width, _rawColumn$minWidth, _rawColumn$maxWidth, _rawColumn$sortable, _rawColumn$resizable, _rawColumn$valueForma, _rawColumn$filter, _ref2, _ref3, _frameworkComponents$;
      const rowGroup = (_rawGroupBy$includes = rawGroupBy === null || rawGroupBy === void 0 ? void 0 : rawGroupBy.includes(rawColumn.field)) !== null && _rawGroupBy$includes !== void 0 ? _rawGroupBy$includes : false;
      const frozen = rowGroup || rawColumn.frozen;
      const cellRendererValue = rawColumn.cellRenderer;
      const components = frameworkComponents ? Object.keys(frameworkComponents) : null;
      const indexOfComponent = components === null || components === void 0 ? void 0 : components.indexOf(cellRendererValue);
      const customComponentName = indexOfComponent > -1 ? components[indexOfComponent] : null;
      const column = _objectSpread(_objectSpread({}, rawColumn), {}, {
        key: rawColumn.field,
        parent: null,
        idx: 0,
        frozen,
        isLastFrozenColumn: false,
        rowGroup,
        width: (_rawColumn$width = rawColumn.width) !== null && _rawColumn$width !== void 0 ? _rawColumn$width : defaultWidth,
        minWidth: (_rawColumn$minWidth = rawColumn.minWidth) !== null && _rawColumn$minWidth !== void 0 ? _rawColumn$minWidth : defaultMinWidth,
        maxWidth: (_rawColumn$maxWidth = rawColumn.maxWidth) !== null && _rawColumn$maxWidth !== void 0 ? _rawColumn$maxWidth : defaultMaxWidth,
        sortable: (_rawColumn$sortable = rawColumn.sortable) !== null && _rawColumn$sortable !== void 0 ? _rawColumn$sortable : defaultSortable,
        resizable: (_rawColumn$resizable = rawColumn.resizable) !== null && _rawColumn$resizable !== void 0 ? _rawColumn$resizable : defaultResizable,
        formatter: rawColumn.cellRenderer ? rawColumn.cellRenderer : (_rawColumn$valueForma = rawColumn.valueFormatter) !== null && _rawColumn$valueForma !== void 0 ? _rawColumn$valueForma : defaultFormatter,
        filter: (_rawColumn$filter = rawColumn.filter) !== null && _rawColumn$filter !== void 0 ? _rawColumn$filter : defaultFilter,
        cellRenderer: (_ref2 = (_ref3 = (_frameworkComponents$ = frameworkComponents === null || frameworkComponents === void 0 ? void 0 : frameworkComponents[customComponentName]) !== null && _frameworkComponents$ !== void 0 ? _frameworkComponents$ : rawColumn.cellRenderer) !== null && _ref3 !== void 0 ? _ref3 : rawColumn.valueFormatter) !== null && _ref2 !== void 0 ? _ref2 : defaultFormatter
        // topHeader: rawColumn.field,
      });

      if (rowGroup) {
        var _column$groupFormatte;
        (_column$groupFormatte = column.groupFormatter) !== null && _column$groupFormatte !== void 0 ? _column$groupFormatte : column.groupFormatter = _formatters.toggleGroupFormatter;
      }
      if (rawColumn.editable) {
        column.cellEditor = column.cellEditor ? column.cellEditor : props => {
          return /*#__PURE__*/_react.default.createElement("input", {
            className: _textEditor.textEditorClassname,
            value: props.row[props.column.key],
            onChange: event => props.onRowChange(_objectSpread(_objectSpread({}, props.row), {}, {
              [props.column.key]: event.target.value
            }))
          });
        };
      }
      return column;
    });
    return {
      columns5,
      colSpanColumns,
      lastFrozenColumnIndex,
      groupBy
    };
  }, [columns4, defaultWidth, defaultMinWidth, defaultMaxWidth, defaultFormatter, defaultResizable, defaultSortable, rawGroupBy]);
  return {
    columns5
  };
}