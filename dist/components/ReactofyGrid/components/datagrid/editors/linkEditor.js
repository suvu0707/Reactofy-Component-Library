"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LinkEditor;
exports.linkEditorClassname = void 0;
var _core = require("@linaria/core");
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const linkEditorInternalClassname = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.LinkEditor {\n    letter-spacing: 0px;\n    color: #000000;\n    opacity: 1;\n    text-decoration: underline !important;\n    height: 14px;\n    font-size: var(--rdg-font-size);\n    font-family: var(--rdg-font-family);\n  }\n"])));
const linkEditorClassname = "rdg-link-editor ".concat(linkEditorInternalClassname);
exports.linkEditorClassname = linkEditorClassname;
function LinkEditor(_ref) {
  let {
    row,
    column
  } = _ref;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
    href: row[column.key],
    className: linkEditorClassname,
    target: "blank"
  }, row[column.key]));
}