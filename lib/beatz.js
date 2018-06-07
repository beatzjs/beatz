/*!
 * beatz
 * Copyright(c) 2018 J Clarke
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 */

var EventEmitter = require('events').EventEmitter;
var mixin = require('merge-descriptors');
var proto = require('./monitor');

 /** 
  * Expose `createMonitor()`
 */

exports = module.exports = createMonitor;

 /**
  * Create a beatz application monitor
  * 
  * @return {Function}
  * @api public
  */

function createMonitor() {
    var monitor = () => {
    }

    mixin(monitor, EventEmitter.prototype, false);
    mixin(monitor, proto, false);

    monitor.init();

    return monitor;
}