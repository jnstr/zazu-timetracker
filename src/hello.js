module.exports = (pluginContext) => {
  return (name, env = {}) => {
    return new Promise((resolve, reject) => {
      resolve([
        {
          icon: 'fa-hand-spock-o',
          title: `Hello, ${name}!`,
          subtitle: 'Please type your name!',
        },
      ])
    })
  }
}
