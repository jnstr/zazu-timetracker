const timetrack = require('./timetrack');
const Sugar = require('sugar-date');
const calculateDuration = require('./calculateDuration');

module.exports = (pluginContext) => {
    return (query, env = {}) => {
        return new Promise((resolve, reject) => {
            // first trim all spaces
            query = query.trim();

            // Only proceed if we're having a valid date
            if ((query.match(/^\d{4}-\d{2}-\d{2}$/) === null && query != 'today' && query != 'yesterday') || !Sugar.Date.isValid(Sugar.Date.create(query))) {
                return resolve([
                    {
                        icon: 'fa-clock-o',
                        title: 'Search timetracking history',
                        subtitle: `Enter a date (yyyy-mm-dd) or quick filter for "today" or "yesterday"`,
                        value: ''
                    }
                ]);
            }

            // create a date object (kinda strange code for sugar but I couldn't make it work with cleaner code)
            const startOfDay = new Date(Sugar.Date.format(Sugar.Date.beginningOfDay(Sugar.Date.create(query)))).getTime();
            const endOfDay = new Date(Sugar.Date.endOfDay(Sugar.Date.create(query))).getTime();

            // load the data from the json file
            timetrack.loadData();

            // Filter the items by day
            const historyItems = timetrack.getHistory()
                .filter(entry => {
                    // the entry starts at the given day
                    if (entry.start >= startOfDay && entry.start <= endOfDay) {
                        return true;
                    }

                    // the entry ends at the given day
                    if ('stop' in entry && entry.stop >= startOfDay && entry.stop <= endOfDay) {
                        return true;
                    }

                    // no luck
                    return false;
                })
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
                    const startDate = Sugar.Date.format(Sugar.Date.create(entry.start), '%H:%M:%S');

                    return {
                        icon: 'fa-clock-o',
                        title: `[${duration}] ${project}`,
                        subtitle: `Started on ${startDate}`,
                        value: `[${duration}] ${project} (start: ${startDate})`
                    }
                });

            // no items found: send message to the app
            if (!historyItems.length) {
                // get the date formatted
                const day = Sugar.Date.format(Sugar.Date.create(query), '%F');

                return resolve([
                    {
                        icon: 'fa-clock-o',
                        title: `No entries found for ${day}`,
                        value: ''
                    }
                ]);
            }

            resolve(historyItems);
        });
    }
}
