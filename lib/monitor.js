/*!
 * beatz
 * Copyright(c) 2018 J Clarke
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

var flatten = require('array-flatten');
var slice = Array.prototype.slice;

 /**
  * Monitor prototype
  */

var monitor = exports = module.exports = {};

/**
 * Get the defauly configuration
 * 
 * @private
 */

monitor.defaultConfig = function defaultConfig() {
    this.env = process.env.NODE_ENV || 'development';
    this.middlewareStack = [];
}

/** 
 * Initialise the monitor
 * 
 * @private
*/
monitor.init = function init () {
    this.defaultConfig();
}

/**
 * Test the monitor for healthiness
 * Returns the health state description of the monitor
 * 
 * @public
 */

monitor.healthState = function healthState() {
    switch(this.isHealthy()) {
        case undefined:
            return 'unknown';
        case true:
            return 'healthy';
        case false:
            return 'unhealthy';
        default:
            return 'unknown';
    }
}

/**
 * Test the monitor for healthiness
 * Returns truthy is all elements are healthy
 * Returns false if any element(s) are unhealthy
 * Returnd undefined if there are no elements
 */

monitor.isHealthy = function isHealthy() {
    let overallState = undefined
    let states = [];

    for(let mw of this.middlewareStack) {
        states.push(mw.callback());
    }

    let healthy = states.filter(s => s == true);
    let unhealthy = states.filter(s => s == false); 
    if(healthy && healthy.length != 0) overallState = true;
    if(unhealthy && unhealthy.length != 0) overallState = false;
    return overallState;
}

/**
 * Dump the status of all of the monitored
 * elements
 * 
 * @public
 */

monitor.dump = function dump() {
    var status = [];

    for(let mw of this.middlewareStack) {
        status.push({element: mw.element, health: mw.callback() ? 'healthy' : 'unhealthy'});
    }

    return status;
}

/**
 * Add middleware to the monitor.
 * 
 * @public
 */

monitor.use = function use(fn) {
    var offset = 0;
    var element = "";

    if(typeof fn !== 'function'){
        var arg = fn;

        while(Array.isArray(arg) && arg.length !==0 ) {
            arg = arg[0];
        }

        if(typeof arg !== 'function') {
            offset = 1;
            element = fn;
        }

        var callbacks = flatten(slice.call(arguments, offset));

        if(callbacks.length === 0) {
            throw new TypeError('monitor.use() requires a middleware function');
        }

        for(let cb of callbacks) {
            var fn = cb;

            if(typeof fn !== 'function') {
                throw new TypeError('monitor.use() requires a middleware function');
            }

            this.middlewareStack.push({element: element, callback: fn});
        }
    }

    return this;
}