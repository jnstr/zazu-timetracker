const timetrack = require('./timetrack');

module.exports = (pluginContext) => {
    return (projectName, env = {}) => {
        return new Promise((resolve, reject) => {
            timetrack.loadData();
            timetrack.registerStart(projectName);
            const result = timetrack.save();
            resolve(result);
        });
    }
}
