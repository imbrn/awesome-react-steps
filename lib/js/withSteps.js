"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _model = require("./model");

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withSteps = function withSteps(Component) {
  var StepsWrapper = function (_React$Component) {
    _inherits(StepsWrapper, _React$Component);

    function StepsWrapper(props) {
      _classCallCheck(this, StepsWrapper);

      var _this = _possibleConstructorReturn(this, (StepsWrapper.__proto__ || Object.getPrototypeOf(StepsWrapper)).call(this, props));

      _this.state = {
        model: _this._getModelFromProps(props)
      };

      // Bindings
      ["setModel", "next", "advance", "previous", "back", "setCurrent", "jumpTo", "setStepState", "done", "skip", "invalidate"].forEach(function (method) {
        _this[method] = _this[method].bind(_this);
      });
      return _this;
    }

    _createClass(StepsWrapper, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        this.setState({
          model: this._getModelFromProps(nextProps)
        });
      }
    }, {
      key: "_getModelFromProps",
      value: function _getModelFromProps(props) {
        var model = void 0;

        if (props.model instanceof _model2.default) {
          model = props.model;
        } else {
          model = new _model2.default(props.model);
        }

        return model;
      }
    }, {
      key: "render",
      value: function render() {
        return _react2.default.createElement(Component, _extends({}, this.props, {
          model: this.state.model,
          setModel: this.setModel,
          next: this.next,
          advance: this.next,
          previous: this.previous,
          setCurrent: this.setCurrent,
          jumpTo: this.jump,
          jumpToFirst: this.jumpToFirst,
          jumpToLast: this.jumpToLast,
          back: this.previous,
          done: this.done,
          skip: this.skip,
          invalidate: this.invalidate
        }));
      }
    }, {
      key: "setModel",
      value: function setModel(model) {
        if (this.state.model !== model) {
          this.setState({
            model: model
          });
        }
      }
    }, {
      key: "next",
      value: function next() {
        this.setModel(this.state.model.next());
      }
    }, {
      key: "advance",
      value: function advance() {
        this.next();
      }
    }, {
      key: "previous",
      value: function previous() {
        this.setModel(this.state.model.previous());
      }
    }, {
      key: "back",
      value: function back() {
        this.previous();
      }
    }, {
      key: "setCurrent",
      value: function setCurrent(stepIndex) {
        this.setModel(this.state.model.setCurrent(stepIndex));
      }
    }, {
      key: "jumpTo",
      value: function jumpTo(stepIndex) {
        this.setCurrent(stepIndex);
      }
    }, {
      key: "jumpToFirst",
      value: function jumpToFirst() {
        this.jumpTo(0);
      }
    }, {
      key: "jumpToLast",
      value: function jumpToLast() {
        this.jumpTo(this.satte.model.size - 1);
      }
    }, {
      key: "setStepState",
      value: function setStepState(stepIndex, state) {
        this.setModel(this.state.model.setStepState(stepIndex, state));
      }
    }, {
      key: "done",
      value: function done(stepIndex) {
        this.setModel(this.state.model.done(stepIndex));
      }
    }, {
      key: "skip",
      value: function skip(stepIndex) {
        this.setModel(this.state.model.skip(stepIndex));
      }
    }, {
      key: "invalidate",
      value: function invalidate(stepIndex) {
        this.setModel(this.state.model.invalidate(stepIndex));
      }
    }]);

    return StepsWrapper;
  }(_react2.default.Component);

  return StepsWrapper;
};

exports.default = withSteps;