const timetrack = require('./timetrack');

module.exports = (pluginContext) => {
    return (query, env = {}) => {
        return new Promise((resolve, reject) => {
            // only allow a timestamp (the start of the entry)
            if (!query || !(!isNaN(parseFloat(query)) && isFinite(query))) {
                reject();
            };

            timetrack.loadData();
            timetrack.registerDelete(query);
            const result = timetrack.save();
            resolve(result);
        });
    }
}
