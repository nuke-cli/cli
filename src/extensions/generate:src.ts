import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {
  const { template, parameters } = toolbox
  const name = parameters.first
  const path = `./${name}/src`

  toolbox.generateAppTSX = async (): Promise<void> => {
    const props = {
      template: 'app.tsx.ejs',
      target: `${path}/App.tsx`,
    }

    await template.generate({ ...props })
  }

  toolbox.generateAppTest = async (): Promise<void> => {
    const props = {
      template: 'app.test.tsx.ejs',
      target: `${path}/App.test.tsx`,
    }

    await template.generate({ ...props })
  }

  toolbox.generateIndexSASS = async (): Promise<void> => {
    const props = {
      template: 'index.sass.ejs',
      target: `${path}/index.sass`,
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

  toolbox.generateSRC = async () => {
    Promise.all([
      toolbox.generateAppTSX(),
      toolbox.generateAppTest(),
      toolbox.generateIndexTSX(),
      toolbox.generateIndexSASS(),
    ])
  }
}
