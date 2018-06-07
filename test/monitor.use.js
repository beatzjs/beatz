var assert = require('assert');
var should = require('should');
var beatz = require('..');

describe('monitor.use', () => {

    describe('.use(middleware)', () => {
        it('should attach and call middleware', () => {
            var called = false;

            function fn1() {
                called = true;
            }

            beatz().use('fn1', fn1).isHealthy();

            assert.equal(called, true);
        })

        it('should attach and call an array of middlewares', () => {
            var called = 0;

            var fns = [
                () => { called++ },
                () => { called++ },
                () => { called++ }
            ]

            beatz().use(fns).isHealthy();

            assert.equal(called, 3);
        })

        it('should throw if no callback is supplied', () => {
            assert.throws(() => {
                var monitor = beatz();
                monitor.use('foo', undefined);
            })
            assert.throws(() => {
                var monitor = beatz();
                monitor.use(undefined);
            })            
        })
    })
})