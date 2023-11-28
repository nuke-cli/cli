import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'component:ts',
  description: 'Creates .tsx, .sass, .test.tsx into a folder.',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
      parameters,
      generateComponent,
    } = toolbox

    const name = parameters.first

    if (!name) {
      return info('A name for component is required!')
    }

    generateComponent()

    info(`Component ${name} folder has been created.`)
  },
}
