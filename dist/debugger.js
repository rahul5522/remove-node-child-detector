"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var defaultOptions = {
  highlightErrorNode: true,
  logErrorNodeToConsole: true,
  showErrorAlerts: false
};
function highlightElement(element) {
  if (element && element.style) {
    element.style.border = "0.5px solid tomato";
    element.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
  }
}
function logError(message) {
  if (console && console.error) {
    var _console;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    (_console = console).log.apply(_console, ["".concat(message)].concat(args));
  }
}
function showAlert(message) {
  if (typeof window !== "undefined" && window.alert) {
    window.alert("".concat(message));
  }
}
function overrideRemoveChild(options) {
  var originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      if (options.logErrorNodeToConsole) {
        logError("Cannot remove a child from a different parent", child, this);
      }
      if (options.showErrorAlerts) {
        showAlert("Cannot remove a child from a different parent ".concat(child));
      }
      if (options.highlightErrorNode) {
        highlightElement(child);
        highlightElement(this);
      }
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };
}
function overrideInsertBefore(options) {
  var originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (options.logErrorNodeToConsole) {
        logError("Cannot insert before a reference node from a different parent", referenceNode, this);
      }
      if (options.showErrorAlerts) {
        showAlert("Cannot insert before a reference node from a different parent");
      }
      if (options.highlightErrorNode) {
        highlightElement(child);
        highlightElement(this);
      }
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  };
}
function startDebugger() {
  var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = _objectSpread(_objectSpread({}, defaultOptions), userOptions);
  if (typeof window === 'undefined' || typeof Node === 'undefined') {
    console.warn('This debugger is intended for browser environments only.');
    return;
  }
  if (typeof Node === "function" && Node.prototype) {
    overrideRemoveChild(options);
    overrideInsertBefore(options);
  } else {
    logError("Node.prototype is not available. Debugging cannot be enabled.");
  }
}
module.exports = startDebugger;