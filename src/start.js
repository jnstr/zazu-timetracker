module.exports = (pluginContext) => {
    return (project, env = {}) => {
        return new Promise((resolve, reject) => {
            // get the projectName
            const projectName = trim(project);

            let title = 'Start tracking time';
            if (projectName) {
                title += ` for ${projectName}`;
            }

            resolve([
                {
                    icon: 'fa-clock-o',
                    title: title,
                    subtitle: 'Click to start timetracker',
                    value: projectName
                },
            ])
        })
    }
}
