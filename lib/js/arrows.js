"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require("lodash.uniqueid");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

var Arrows = function Arrows(_ref) {
  var model = _ref.model,
    className = _ref.className,
    numberStyle = _ref.numberStyle,
    numberClassName = _ref.numberClassName,
    labelStyle = _ref.labelStyle,
    labelClassName = _ref.labelClassName,
    rest = _objectWithoutProperties(_ref, [
      "model",
      "className",
      "numberStyle",
      "numberClassName",
      "labelStyle",
      "labelClassName"
    ]);

  var renderStep = function renderStep(step, index) {
    var modifiersClasses = (0, _classnames2.default)(
      model.current === index && "Arrows--step__current",
      model.current > index && "Arrows--step__passed",
      model.current < index && "Arrows--step__coming"
    );
    return _react2.default.createElement(
      "div",
      {
        key: index,
        className: (0, _classnames2.default)("Arrows--step", modifiersClasses)
      },
      _react2.default.createElement(SvgArrow, {
        className: "Arrows--step--arrow"
      }),
      _react2.default.createElement(
        "div",
        { className: "Arrows--step--content" },
        _react2.default.createElement(
          "span",
          {
            style: numberStyle,
            className: (0, _classnames2.default)(
              "Arrows--step--number",
              numberClassName
            )
          },
          index + 1
        ),
        _react2.default.createElement(
          "span",
          {
            stye: labelStyle,
            className: (0, _classnames2.default)(
              "Arrows--step--label",
              labelClassName
            )
          },
          step.label
        )
      )
    );
  };

  return _react2.default.createElement(
    "div",
    _extends({}, rest, {
      className: (0, _classnames2.default)("Arrows", className)
    }),
    model.steps.map(renderStep)
  );
};

var SvgArrow = function SvgArrow(_ref2) {
  var className = _ref2.className;

  var gradientId = (0, _lodash2.default)("SvgArrow");
  return _react2.default.createElement(
    "svg",
    {
      width: "100%",
      height: "100%",
      preserveAspectRatio: "none",
      viewBox: "0 0 100 100"
    },
    _react2.default.createElement(
      "defs",
      null,
      _react2.default.createElement(
        "linearGradient",
        { x1: "0", y1: "0", x2: "1", y2: "0", id: gradientId },
        _react2.default.createElement("stop", {
          offset: "0",
          stopColor: "#fff",
          stopOpacity: "0.10"
        }),
        _react2.default.createElement("stop", {
          offset: "1",
          stopColor: "#fff",
          stopOpacity: "0.25"
        })
      )
    ),
    _react2.default.createElement("polygon", {
      points: "0,0 95,0 100,50 95,100 0,100 5,50",
      fill: "url(#" + gradientId + ")",
      className: className
    })
  );
};

exports.default = Arrows;
