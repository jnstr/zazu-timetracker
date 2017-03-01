const timetrack = require('./timetrack');
const Sugar = require('sugar-date');
const calculateDuration = require('./calculateDuration');

module.exports = (pluginContext) => {
    return (query, env = {}) => {
        return new Promise((resolve, reject) => {
            // first trim all spaces
            query = query.trim();

            // load the data from the json file
            timetrack.loadData();

            // Filter the items by day
            let historyItems = timetrack.getHistory()
                .slice(-10)
                .map(entry => {
                    // get the duration of the entry
                    let duration = 'Running';
                    if ('stop' in entry) {
                        // We use beginningOfDay to support different timezones
                        duration = calculateDuration(entry.start, entry.stop);
                    }

                    // get the project name
                    const project = entry.project || 'No project';

                    // when did we start?
                    const startDate = Sugar.Date.format(Sugar.Date.create(entry.start), '%F %H:%M:%S');

                    // we use the start ts as unique id because it's unique
                    return {
                        icon: 'fa-clock-o',
                        title: `[${duration}] ${project}`,
                        subtitle: `Started on ${startDate}, click to delete`,
                        value: entry.start
                    }
                });

            // no items found: send message to the app
            if (!historyItems.length) {
                return resolve([
                    {
                        icon: 'fa-clock-o',
                        title: `No entries found to delete`,
                        value: false
                    }
                ]);
            }

            resolve(historyItems);

        });
    }
}
