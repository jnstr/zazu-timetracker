const timetrack = require('./timetrack');

module.exports = (pluginContext) => {
    return (projectName, env = {}) => {
        return new Promise((resolve, reject) => {
            try {
            timetrack.loadData();
            timetrack.registerStart(projectName);
            const result = timetrack.save();
            } catch (e) {
                alert('fout: ' + e);
            }
            resolve(result);
        });
    }
}
