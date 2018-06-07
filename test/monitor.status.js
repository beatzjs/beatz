var assert = require('assert');
var should = require('should');
var beatz = require('..');

describe(('monitor.isHealthy'), () => {
    it('should be healthy if all monitored elements are healthy', () => {
        var monitor = beatz();

        monitor.use('foo', () => {return true});
        monitor.use('bar', () => {return true});
        
        assert.equal(monitor.healthState(), 'healthy');
        assert.equal(monitor.isHealthy(), true);
    })

    it('should be unhealthy if any monitored elements are unhealthy', () => {
        var monitor = beatz();

        monitor.use('foo', () => {return true});
        monitor.use('bar', () => {return false});
        
        assert.equal(monitor.healthState(), 'unhealthy');        
        assert.equal(monitor.isHealthy(), false);
    })

    it('should be unhealthy if all monitored elements are unhealthy', () => {
        var monitor = beatz();

        monitor.use('foo', () => {return false});
        monitor.use('bar', () => {return false});
        
        assert.equal(monitor.healthState(), 'unhealthy');        
        assert.equal(monitor.isHealthy(), false);
    })
})

describe(('monitor.dump'), () => {
    var monitor = beatz();

    monitor.use('foo', () => {return true});
    monitor.use('bar', () => {return false});

    var res = monitor.dump();

    assert.equal(res[0].element, 'foo');
    assert.equal(res[0].health, 'healthy');
    assert.equal(res[1].element, 'bar');
    assert.equal(res[1].health, 'unhealthy');
})