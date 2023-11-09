"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraggableRowRenderer = DraggableRowRenderer;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _reactDnd = require("react-dnd");
var _clsx = require("clsx");
var _core = require("@linaria/core");
var _src = require("../../../../src");
const _excluded = ["rowIdx", "isRowSelected", "className", "onRowReorder"];
var _templateObject, _templateObject2;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const rowDraggingClassname = (0, _core.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  opacity: 0.5;\n"])));
const rowOverClassname = (0, _core.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  background-color: #ececec;\n"])));
function DraggableRowRenderer(_ref) {
  let {
      rowIdx,
      isRowSelected,
      className,
      onRowReorder
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const [{
    isDragging
  }, drag] = (0, _reactDnd.useDrag)({
    type: "ROW_DRAG",
    item: {
      index: rowIdx
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const [{
    isOver
  }, drop] = (0, _reactDnd.useDrop)({
    accept: "ROW_DRAG",
    drop(_ref2) {
      let {
        index
      } = _ref2;
      onRowReorder(index, rowIdx);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  className = (0, _clsx.clsx)(className, {
    [rowDraggingClassname]: isDragging,
    [rowOverClassname]: isOver
  });
  return /*#__PURE__*/_react.default.createElement(_src.Row, _extends({
    ref: _ref3 => {
      if (_ref3) {
        drag(_ref3.firstElementChild);
      }
      drop(_ref3);
    },
    rowIdx: rowIdx,
    isRowSelected: isRowSelected,
    className: className
  }, props));
}