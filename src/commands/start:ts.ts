import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'start:ts',
  description: 'Starts a React based project set on Typescript.',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
      parameters,
      generateAppTSX,
      generateAppSASS,
      generateIndexTSX,
      generateIndexHTML,
    } = toolbox

    const name = parameters.first

    await Promise.all([
      generateAppTSX(),
      generateAppSASS(),
      generateIndexTSX(),
      generateIndexHTML(),
    ])

    info(`Project ${name} has been created! Have fun.`)
  },
}
