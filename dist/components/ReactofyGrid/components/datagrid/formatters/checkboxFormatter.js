"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkboxFormatter = checkboxFormatter;
var _react = _interopRequireDefault(require("react"));
var _clsx = require("clsx");
var _core = require("@linaria/core");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
const _excluded = ["allRowsSelected", "id", "value", "onChange"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function checkboxFormatter(_ref, ref) {
  let {
      allRowsSelected,
      id,
      value,
      onChange
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const checkboxLabel = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  @layer rdg.CheckboxLabel {\n    cursor: pointer;\n    display: flex !important;\n    align-items: center;\n    justify-content: center;\n    position: absolute;\n    inset: 0;\n    margin-inline-end: 1px; /* align checkbox in row group cell */\n  }\n"])));
  const checkboxLabelClassname = "rdg-checkbox-label ".concat(checkboxLabel);
  const checkboxInput = (0, _core.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  @layer rdg.CheckboxInput {\n    all: unset;\n  }\n"])));
  const checkboxInputClassname = "rdg-checkbox-input ".concat(checkboxInput);
  const checkbox = (0, _core.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  @layer rdg.CheckboxIcon {\n    content: \"\";\n    inline-size: 20px;\n    block-size: 20px;\n    border: 0.9998000264167786px solid #95b3d7;\n    background-color: var(--rdg-background-color);\n    height: 13px;\n    width: 13px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    & > div {\n      height: 7px;\n      width: 7px;\n    }\n\n    .", ":checked + & > div {\n      background-color: var(--rdg-checkbox-color);\n\n      /* outline: 3px solid var(--rdg-background-color);\n      height: 8px;\n      width: 8px; */\n    }\n\n    .", ":focus + & {\n      border-color: var(--rdg-checkbox-focus-color);\n    }\n  }\n"])), checkboxInput, checkboxInput);
  const checkboxClassname = "rdg-checkbox ".concat(checkbox);
  const checkboxLabelDisabled = (0, _core.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  @layer rdg.CheckboxLabel {\n    cursor: default;\n\n    .", " {\n      border-color: var(--rdg-checkbox-disabled-border-color);\n      background-color: var(--rdg-checkbox-disabled-background-color);\n    }\n  }\n"])), checkbox);
  const checkboxLabelDisabledClassname = "rdg-checkbox-label-disabled ".concat(checkboxLabelDisabled);
  function handleChange(e) {
    console.log("target", e.target.checked);
    onChange(e.target.checked, e.nativeEvent.shiftKey);
  }
  console.log("checked", id !== undefined && id);
  const rowCheckboxTestId = "rowCheckBox".concat(id);
  return /*#__PURE__*/_react.default.createElement("label", {
    "data-testid": "chkLebel".concat(id),
    className: (0, _clsx.clsx)(checkboxLabelClassname, {
      [checkboxLabelDisabledClassname]: props.disabled
    })
  }, /*#__PURE__*/_react.default.createElement("input", _extends({
    type: "checkbox",
    ref: ref,
    checked: value
  }, props, {
    className: checkboxInputClassname,
    onChange: handleChange
  })), /*#__PURE__*/_react.default.createElement("div", {
    "data-testid": "rowCheckbox",
    className: checkboxClassname
  }, /*#__PURE__*/_react.default.createElement("div", {
    "data-testid": rowCheckboxTestId
  })));
}