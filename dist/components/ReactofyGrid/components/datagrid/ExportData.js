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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var _default = ExportData;
exports.default = _default;