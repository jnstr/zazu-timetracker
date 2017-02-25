const timetrack = require('./timetrack');

module.exports = (pluginContext) => {
    return (value, env = {}) => {
        return new Promise((resolve, reject) => {
            timetrack.loadData();
            timetrack.registerStop();
            const result = timetrack.save();
            resolve(result);
        });
    }
}