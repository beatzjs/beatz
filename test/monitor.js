var assert = require('assert');
var should = require('should');
var beatz = require('..');

describe('monitor', () => {
    it('should inherit from event emitter', (done) => {
        var monitor = beatz();
        monitor.on('foo', done);
        monitor.emit('foo');
    })

    it('should be callable', () => {
        var monitor = beatz();
        assert.equal(typeof monitor, 'function');
    })

    it('should return unknown without healthchecks', () => {
        assert.equal(
            beatz().healthState(),
            'unknown');
        assert.equal(
            beatz().isHealthy(),
            undefined);
    })
})

describe('without NODE_ENV', () => {
    it('should default to development', () => {
        process.env.NODE_ENV = '';
        var monitor = beatz();
        monitor.env.should.equal('development');
        process.env.NODE_ENV = 'test';
    })
})