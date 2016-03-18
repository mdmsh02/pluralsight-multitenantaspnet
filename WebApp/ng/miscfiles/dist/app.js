(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var billGatesBirthday = '10-28-1955';

exports.gatesAge = function () {
    return (new Date() - new Date(billGatesBirthday)) / 1000 / 60 / 60 / 24 / 365.25
};


exports.gatesAgeOnDate = function (date1) {
    return (new Date(date1) - new Date(billGatesBirthday)) / 1000 / 60 / 60 / 24 / 365;
};

},{}],2:[function(require,module,exports){
var calcAge = require('./CalcAge.js');

document.getElementsByTagName('body')[0].onload = function() {
    document.body.innerHTML = 'The answer is:' + calcAge.gatesAge();
};





},{"./CalcAge.js":1}]},{},[2]);
