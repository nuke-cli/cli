import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'start:ts',
  description: 'Starts a React based project set on Typescript.',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
      parameters,
      generateSRC,
      generateIndexHTML,
      generateRoot,
    } = toolbox

    const name = parameters.first

    if (!name) {
      return info('A name is required!')
    }

    Promise.all([
      generateSRC(),
      generateIndexHTML(),
      generateRoot(),
    ])

    info(`Project ${name} has been created! Have fun.`)
  },
}
