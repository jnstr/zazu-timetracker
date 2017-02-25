const timetrack = require('./timetrack');
const calculateDuration = require('./calculateDuration');

module.exports = (pluginContext) => {
    return (project, env = {}) => {
        return new Promise((resolve, reject) => {
            timetrack.loadData();
            resolve(timetrack.getHistory().map(entry => {
                // get the duration of the entry
                let duration = 'Running';
                if ('stop' in entry) {
                    duration = calculateDuration(entry.start, entry.stop);
                }

                // get the project name
                const project = entry.project || 'No project';

                return {
                    icon: 'fa-clock-o',
                    title: `[${duration}] ${project}`,
                    subtitle: `Nice work bro!`
                }
            }));
        });
    }
}
