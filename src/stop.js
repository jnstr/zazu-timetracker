module.exports = (pluginContext) => {
    return (project, env = {}) => {
        return new Promise((resolve, reject) => {
            resolve([
                {
                    icon: 'fa-clock-o',
                    title: 'Stop time tracker',
                    subtitle: 'Click to stop the currently active time tracker'
                },
            ])
        })
    }
}
