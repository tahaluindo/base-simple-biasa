const fs = require('fs');
// new function
function readfile(file) {
    return JSON.parse(fs.readFileSync(file));
}

// information
const { covid } = require('./informasi/corona');


module.exports = {
    covid,
};