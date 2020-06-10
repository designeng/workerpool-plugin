const workerpoolPlugin = require('../index');
const wire = require('wire');
const { expect } = require('chai');

let context;

const spec = {
    $plugins: [
        workerpoolPlugin
    ],

    wpool: {
        createWorkerPool: {
            workers: [
                {name: 'fibonacci', path: __dirname + '/assets/worker.js'}
            ]
        }
    },

    poolInvocationResult: {
        create: {
            module: (wpool) => wpool['fibonacci'].proxy()
                .then(function (worker) {
                    return worker.run(10);
                })
                .then(function (result) {
                    wpool['fibonacci'].terminate();
                    return result;
                })
                .catch(function (error) {
                    console.error('Smth went wrong:', error);
                }),
            args: [
                {$ref: 'wpool'}
            ]
        }
    }
}

before(async () => {
    try {
        context = await wire(spec);
    } catch (err) {
        console.log('Wiring error', err);
    }
});

describe('Worker pool', () => {
    it('should be created', () => {
        expect(context.wpool).to.be.ok;
    });

    it('should calculate fibonacci value', () => {
        expect(context.poolInvocationResult).to.equal(55);
    });
});

after(async () => {
    context.destroy();
});
