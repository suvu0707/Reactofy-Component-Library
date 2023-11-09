"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
function useUpdateEffect(fn, deps) {
  const isFirst = (0, _react.useRef)(true);
  (0, _react.useEffect)(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    return fn();
  }, deps);
}
var _default = useUpdateEffect;
exports.default = _default;