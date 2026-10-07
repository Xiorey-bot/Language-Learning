"use strict";

var _excluded = ["size", "color", "strokeWidth", "style"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// === Ikon (pengganti lucide-react, SVG inline supaya tidak bergantung CDN pihak ketiga) ===
// Dimuat paling awal (sebelum data & app.js) karena TABS di data-misc.js mereferensikan komponen ini langsung.
function makeIcon(paths) {
  return function IconComp(_ref) {
    var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 20 : _ref$size,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? "currentColor" : _ref$color,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 2 : _ref$strokeWidth,
      style = _ref.style,
      rest = _objectWithoutProperties(_ref, _excluded);
    return /*#__PURE__*/React.createElement("svg", _extends({
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: style
    }, rest), paths);
  };
}
var Check = makeIcon(/*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));
var ChevronRight = makeIcon(/*#__PURE__*/React.createElement("polyline", {
  points: "9 18 15 12 9 6"
}));
var Circle = makeIcon(/*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "9"
}));
var Flame = makeIcon(/*#__PURE__*/React.createElement("path", {
  d: "M12 2c1 4-4 5-4 9a4 4 0 0 0 8 0c0-2-1-3-1-3s2 1 2 4a6 6 0 0 1-12 0c0-5 4-6 5-10z"
}));
var BookOpen = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M2 5c2-1 5-1.5 8 0v14c-3-1.5-6-1-8 0V5z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M22 5c-2-1-5-1.5-8 0v14c3-1.5 6-1 8 0V5z"
})));
var BarChart3 = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M4 20V10"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 20V4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20 20v-7"
}), /*#__PURE__*/React.createElement("path", {
  d: "M2 20h20"
})));
var Sparkles = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M12 3l1.6 4.8L18 9.4l-4.4 1.6L12 16l-1.6-5L6 9.4l4.4-1.6L12 3z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 15l.7 2.1L22 18l-2.3.9L19 21l-.7-2.1L16 18l2.3-.9L19 15z"
})));
var PenLine = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M12 20h9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
})));
var Volume2 = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polygon", {
  points: "4 9 8 9 12 5 12 19 8 15 4 15 4 9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M17 8a5 5 0 0 1 0 8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19.5 5.5a9 9 0 0 1 0 13"
})));
var Home = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M3 11l9-8 9 8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 10v10h14V10"
})));
var Book = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V4z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M18 4v16"
})));
var Sun = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
})));
var Moon = makeIcon(/*#__PURE__*/React.createElement("path", {
  d: "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"
}));
var Lock = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
  x: "4",
  y: "11",
  width: "16",
  height: "9",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 11V7a4 4 0 0 1 8 0v4"
})));
// === Ikon tambahan untuk peningkatan UI/UX (audio player, timer, navigasi soal) ===
var Play = makeIcon(/*#__PURE__*/React.createElement("polygon", {
  points: "6 3 20 12 6 21 6 3"
}));
var Pause = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
  x: "6",
  y: "4",
  width: "4",
  height: "16",
  rx: "1"
}), /*#__PURE__*/React.createElement("rect", {
  x: "14",
  y: "4",
  width: "4",
  height: "16",
  rx: "1"
})));
var SkipBack = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polygon", {
  points: "19 20 9 12 19 4 19 20"
}), /*#__PURE__*/React.createElement("line", {
  x1: "5",
  y1: "19",
  x2: "5",
  y2: "5"
})));
var SkipForward = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polygon", {
  points: "5 4 15 12 5 20 5 4"
}), /*#__PURE__*/React.createElement("line", {
  x1: "19",
  y1: "5",
  x2: "19",
  y2: "19"
})));
var ClockIcon = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "9"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "12 7 12 12 15 14"
})));
var AlertTriangle = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M10.29 3.86L1.82 18a1 1 0 0 0 .86 1.5h18.64a1 1 0 0 0 .86-1.5L13.71 3.86a1 1 0 0 0-1.72 0z"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "9",
  x2: "12",
  y2: "13"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "17",
  x2: "12.01",
  y2: "17"
})));
var XIcon = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})));
var ListChecks = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M3 6l2 2 4-4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 14l2 2 4-4"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "6",
  x2: "21",
  y2: "6"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "16",
  x2: "21",
  y2: "16"
})));
var FileText = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "14 2 14 8 20 8"
}), /*#__PURE__*/React.createElement("line", {
  x1: "8",
  y1: "13",
  x2: "16",
  y2: "13"
}), /*#__PURE__*/React.createElement("line", {
  x1: "8",
  y1: "17",
  x2: "16",
  y2: "17"
})));
var Link2 = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M9 17H7A5 5 0 0 1 7 7h2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M15 7h2a5 5 0 1 1 0 10h-2"
}), /*#__PURE__*/React.createElement("line", {
  x1: "8",
  y1: "12",
  x2: "16",
  y2: "12"
})));