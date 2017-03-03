module.exports = (pluginContext) => {
    return (project, env = {}) => {
        return new Promise((resolve, reject) => {
            // get the projectName
            let projectName = project.trim();

            let title = 'Start tracking time';
            if (projectName != '') {
                title += ` for "${projectName}"`;
            }

            resolve([
                {
                    icon: 'assets/start.svg',
                    title: title,
                    subtitle: 'Click to start timetracker',
                    value: projectName
                },
            ])
        })
    }
}
