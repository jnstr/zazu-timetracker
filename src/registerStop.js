const path = require('path');
const timetrack = require('./timetrack');

module.exports = (pluginContext) => {
    var filePath;

    return (projectName, env = {}) => {
        // where do we need to store the data?
        filePath = path.join(pluginContext.cwd, 'entries.json');

        return new Promise((resolve, reject) => {
            // register the start of a time tracking entry
            var result = (timetrack.register(filePath, 'stop'));
            resolve(result);
        });
    }
}