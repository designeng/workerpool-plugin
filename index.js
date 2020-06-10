const workerpool = require('workerpool');

module.exports = function workerPoolPlugin(options) {
    const workerPools = {};

    function createWorkerPool({ resolve }, compDef, wire) {
        wire(compDef.options).then(({
            workers
        }) => {
            workers.forEach(function({ name, path }) {
                workerPools[name] = workerpool.pool(path);
            })
            resolve(workerPools);
        });
    }

    return {
        factories: {
            createWorkerPool
        },
        context: {
            destroy: (resolver, wire) => {
                const keys = Object.keys(workerPools);
                keys.forEach(key => {
                    workerPools[key].terminate();
                })
                resolver.resolve();
            }
        }
    }
}
