const { Console } = require('console');

const console = new Console(process.stdout, process.stderr);

module.exports = { console };
