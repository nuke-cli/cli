import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'nuke-cli',
  run: async (toolbox) => {
    const { print } = toolbox

    print.info('Welcome to nuke CLI.')
  },
}

module.exports = command
