import workerpoolPlugin from '../index';
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
});

after(async () => {
    context.destroy();
});
