const workerpool = require('workerpool');

// a deliberately inefficient implementation of the fibonacci sequence
function fibonacci(n) {
    if (n < 2) return n;
    return fibonacci(n - 2) + fibonacci(n - 1);
}

workerpool.worker({
    run: fibonacci
});
