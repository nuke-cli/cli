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

  toolbox.getWebpack = async (): Promise<void> => {
    const { data } = await api.get('webpack.config.js')
    write(`./${name}/webpack.config.js`, `${data}`)
  }

  toolbox.getBabelrc = async (): Promise<void> => {
    const { data } = await api.get('.babelrc')
    write(`./${name}/.babelrc`, JSON.stringify(data, null, 2))
  }

  toolbox.getPackageJSON = async (): Promise<void> => {
    const { data } = await api.get('package.json')
    write(`./${name}/package.json`, JSON.stringify(data, null, 2))
  }

  toolbox.getTSConfig = async (): Promise<void> => {
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

  toolbox.getTestConfig = async (): Promise<void> => {
    const { data } = await api.get('jest.config.json')
    write(`./${name}/jest.config.json`, `${data}`)
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

  toolbox.getDockerfile = async (): Promise<void> => {
    const { data } = await api.get('Dockerfile')
    write(`./${name}/Dockerfile`, `${data}`)
  }

  toolbox.getDockerCompose = async (): Promise<void> => {
    const { data } = await api.get('docker-compose.yml')
    write(`./${name}/docker-compose.yml`, `${data}`)
  }

  toolbox.getDockerIgnore = async (): Promise<void> => {
    const { data } = await api.get('.dockerignore')
    write(`./${name}/.dockerignore`, `${data}`)
  }

  toolbox.generateRoot = (): void => {
    Promise.all([
      toolbox.getWebpack(),
      toolbox.getBabelrc(),
      toolbox.getPackageJSON(),
      toolbox.getTSConfig(),
      toolbox.getTestConfig(),
      toolbox.generateGitignore(),
      toolbox.generateReadme(),
      toolbox.generateLintingSettings(),
      toolbox.getDockerfile(),
      toolbox.getDockerCompose(),
      toolbox.getDockerIgnore(),
    ])
  }
}
