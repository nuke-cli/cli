import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'nucleus-cli',
  run: async (toolbox) => {
    const { print } = toolbox

    print.info('Welcome to nucleus-cli.')
  },
}

module.exports = command
