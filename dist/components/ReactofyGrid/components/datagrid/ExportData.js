"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExportButton = ExportButton;
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
var _react = _interopRequireWildcard(require("react"));
var _core = require("@linaria/core");
var _exportUtils = require("./exportUtils");
var _templateObject;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const toolbarClassname = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-block-end: 8px;\n"])));
const ExportData = props => {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: toolbarClassname
  }, /*#__PURE__*/_react.default.createElement(ExportButton, {
    onExport: () => (0, _exportUtils.exportToCsv)(props.gridElement, "CommonFeatures.csv")
  }, "Export to CSV"), /*#__PURE__*/_react.default.createElement(ExportButton, {
    onExport: () => (0, _exportUtils.exportToXlsx)(props.gridElement, "CommonFeatures.xlsx")
  }, "Export to XSLX"), /*#__PURE__*/_react.default.createElement(ExportButton, {
    onExport: () => (0, _exportUtils.exportToPdf)(props.gridElement, "CommonFeatures.pdf")
  }, "Export to PDF")), props.gridElement);
};
function ExportButton(_ref) {
  let {
    onExport,
    children
  } = _ref;
  const [exporting, setExporting] = (0, _react.useState)(false);
  return /*#__PURE__*/_react.default.createElement("button", {
    disabled: exporting,
    onClick: async () => {
      setExporting(true);
      await onExport();
      setExporting(false);
    }
  }, exporting ? "Exporting" : children);
}
var _default = exports.default = ExportData;