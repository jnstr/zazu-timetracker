const timetrack = require('./timetrack');
const Sugar = require('sugar-date');
const calculateDuration = require('./calculateDuration');

module.exports = (pluginContext) => {
    return (project, env = {}) => {
        return new Promise((resolve, reject) => {
            timetrack.loadData();
            resolve(timetrack.getHistory().map(entry => {
                try {
                // get the duration of the entry
                let duration = 'Running';
                if ('stop' in entry) {
                    // sugarjs sets it auto on 1 hour, so i'll just subtract 3600000 for now, fix this later
                    duration = Sugar.Date.format(Sugar.Date.create(entry.stop - entry.start - 3600000), '%H:%M:%S');
                }

                // get the project name
                const project = entry.project || 'No project';

                // get the start date
                const startDate = Sugar.Date.format(Sugar.Date.create(entry.start), '%c')

                return {
                    icon: 'fa-clock-o',
                    title: `[${duration}] ${project}`,
                    subtitle: `started on ${startDate}`
                }
                } catch (e) {
                    alert('fount: ' + e);
                }
            }));
        });
    }
}
