import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {
  const {
    template,
    parameters
  } = toolbox
  const name = parameters.first
  const path = `./${name}/src`

  toolbox.generateAppTSX = async (): Promise<void> => {
    const props = {
      template: 'app.tsx.ejs',
      target: `${path}/App.tsx`,
    }

    await template.generate({ ...props })
  }

  toolbox.generateAppSASS = async (): Promise<void> => {
    const props = {
      template: 'app.sass.ejs',
      target: `${path}/App.sass`,
    }

    await template.generate({ ...props })
  }

  toolbox.generateIndexTSX = async (): Promise<void> => {
    const props = {
      template: 'index.tsx.ejs',
      target: `${path}/index.tsx`,
    }

    await template.generate({ ...props })
  }
}
