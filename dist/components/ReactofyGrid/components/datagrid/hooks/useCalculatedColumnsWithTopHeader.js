"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCalculatedColumnsWithTopHeader = useCalculatedColumnsWithTopHeader;
require("core-js/modules/es.symbol.description.js");
var _react = require("react");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function useCalculatedColumnsWithTopHeader(_ref) {
  let {
    raawColumns
  } = _ref;
  const {
    columns3
  } = (0, _react.useMemo)(() => {
    const columns3 = raawColumns.map((raawColumn, pos) => {
      //need to be changed
      var recursiveChild = (subChild, raawColumn) => {
        return (subChild === null || subChild === void 0 ? void 0 : subChild.haveChildren) === true && (subChild === null || subChild === void 0 ? void 0 : subChild.children.map((subChild2, index1) => {
          const rawChild2 = _objectSpread(_objectSpread({}, subChild2), {}, {
            // haveChildren:subChild2.children ?? false,
            topHeader: raawColumn.field,
            children: recursiveChild(subChild2, raawColumn)
          });
          return rawChild2;
        }));
      };
      const column = _objectSpread(_objectSpread({}, raawColumn), {}, {
        topHeader: raawColumn.field,
        haveChildren: raawColumn.children ? true : false,
        children: (raawColumn === null || raawColumn === void 0 ? void 0 : raawColumn.haveChildren) === true && (raawColumn === null || raawColumn === void 0 ? void 0 : raawColumn.children.map((child, index1) => {
          const rawChild = _objectSpread(_objectSpread({}, child), {}, {
            // haveChildren:child.children ?? false,
            topHeader: raawColumn.field,
            children: (child === null || child === void 0 ? void 0 : child.haveChildren) === true && (child === null || child === void 0 ? void 0 : child.children.map((subChild, index2) => {
              const rawChild1 = _objectSpread(_objectSpread({}, subChild), {}, {
                // haveChildren:subChild.children ?? false,
                topHeader: raawColumn.field,
                children: recursiveChild(subChild, raawColumn)
              });
              return rawChild1;
            }))
          });
          return rawChild;
        }))
      });

      // if(!column.children){
      //   column.haveChildren=false
      // }

      return column;
    });
    return {
      columns3
    };
  }, [raawColumns //need to be changed
  ]);

  return {
    columns3
  };
}