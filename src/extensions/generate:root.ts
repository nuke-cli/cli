import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {
  const {
    http,
    parameters,
    template,
    filesystem: { write },
  } = toolbox
  const name = parameters.first
  const baseURL = 'https://raw.githubusercontent.com/cl4pper/react-setup/main/'
  // instatiate the api connection
  const api = http.create({ baseURL })

  toolbox.generateWebpack = async (): Promise<void> => {
    const { data } = await api.get('webpack.config.js')

    write(`./${name}/webpack.config.js`, `${data}`)
  }

  toolbox.generateBabelrc = async (): Promise<void> => {
    const { data } = await api.get('.babelrc')

    write(`./${name}/.babelrc`, JSON.stringify(data, null, 2))
  }

  toolbox.generatePackageJSON = async (): Promise<void> => {
    const { data } = await api.get('package.json')

    write(`./${name}/package.json`, JSON.stringify(data, null, 2))
  }

  toolbox.generateTSConfig = async (): Promise<void> => {
    const { data } = await api.get('tsconfig.json')

    write(`./${name}/tsconfig.json`, JSON.stringify(data, null, 2))
  }

  toolbox.generateReadme = async (): Promise<void> => {
    await template.generate({
      template: 'readme.ejs',
      target: `${name}/README.md`,
      props: { name },
    })
  }

  toolbox.generateJestConfig = async (): Promise<void> => {
    const props = {
      template: 'jest.config.ejs',
      target: `${name}/jest.config.json`,
    }

    await template.generate({ ...props })
  }

  toolbox.generateGitignore = async (): Promise<void> => {
    const props = {
      template: 'gitignore.ejs',
      target: `${name}/.gitignore`,
    }

    await template.generate({ ...props })
  }

  toolbox.generateLintingSettings = async (): Promise<void> => {

    await template.generate({
      template: 'prettierrc.ejs',
      target: `${name}/.prettierrc`,
     })
    await template.generate({
      template: 'prettierignore.ejs',
      target: `${name}/.prettierignore`,
     })
  }

  toolbox.generateRoot = (): void => {
    Promise.all([
      toolbox.generateWebpack(),
      toolbox.generateBabelrc(),
      toolbox.generatePackageJSON(),
      toolbox.generateTSConfig(),
      toolbox.generateJestConfig(),
      toolbox.generateGitignore(),
      toolbox.generateReadme(),
      toolbox.generateLintingSettings()
    ])
  }
}
