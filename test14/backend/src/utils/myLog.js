function log(data) {
    process.stdout.write(`${new Date().toISOString()} - ${data}\n`);
}

module.exports = { log };