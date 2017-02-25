const timetrack = require('./timetrack');
const Sugar = require('sugar-date');
const calculateDuration = require('./calculateDuration');

module.exports = (pluginContext) => {
    return (project, env = {}) => {
        return new Promise((resolve, reject) => {
            // we don't want to show all history, do we?
            const historyLimit = parseInt(env['historyNumItems'] || 25);

            // load the data from the json file
            timetrack.loadData();

            // group the items by day
            const historyItems = timetrack.getHistory().reduce((carry, entry) => {
                // get the timestamp at te beginning of the day
                const dayStart = Sugar.Date.format(Sugar.Date.create(entry.start), '%F');
                // alert(dayStart);

                // group the time registrations by day
                if (!carry[dayStart]) {
                    carry[dayStart] = [];
                }
                carry[dayStart].push(entry);

                return carry;
            }, {});

            // calculate the result
            let result = [];

            // generate the result for each day
            for (let day in historyItems) {
                if (!historyItems.hasOwnProperty(day)) {
                    continue;
                }

                // create the summary of the day
                const summary = historyItems[day].map(entry => {
                    // get the duration of the entry
                    let duration = 'Running';
                    if ('stop' in entry) {
                        // sugarjs sets it auto on 1 hour, so i'll just subtract 3600000 for now, fix this later
                        duration = Sugar.Date.format(Sugar.Date.create(entry.stop - entry.start - 3600000), '%H:%M:%S');
                    }

                    // get the project name
                    const project = entry.project || 'No project';

                    // when did we start?
                    const startDate = Sugar.Date.format(Sugar.Date.create(entry.start), '%H:%M:%S');

                    return `[${duration}] ${project} (start: ${startDate})`;
                })

                // const historyDate = Sugar.Date.create(dayStart).format('%F');
                result.push({
                    icon: 'fa-clock-o',
                    title: day,
                    subtitle: `Select to copy the summary`,
                    preview: `<div style="font-family: sans-serif; font-size: 12px;">${summary.join('<br>')}</div>`
                });
            }

            resolve(result);
        });
    }
}
