## Workerpool plugin for wire.js

## Installation
`npm i workerpool-plugin`

## Usage
Install wire from `git://github.com/cujojs/wire.git#0.10.11`
```
import wire from 'wire';
import workerpoolPlugin from 'workerpool-plugin';

const spec = {
    $plugins: [
        workerpool
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
                    return worker.run(8);
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

wire(spec)
```
