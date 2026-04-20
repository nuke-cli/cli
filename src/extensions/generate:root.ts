import { GluegunToolbox } from 'gluegun'
import * as constants from '../constants'

module.exports = (toolbox: GluegunToolbox) => {
  const {
    http,
    parameters,
    template,
    filesystem: { write },
  } = toolbox
  const name = parameters.first
  const api = http.create({ baseURL: constants.BASE_URL })

  /*
    fetching from repository
  */
  toolbox.getWebpack = async (): Promise<void> => {
    const { data } = await api.get('webpack.config.js')
    write(`./${name}/webpack.config.js`, `${data}`)
  }

  /*
    fetching from repository
  */
  toolbox.getPackageJSON = async (): Promise<void> => {
    const { data } = await api.get('package.json')
    write(`./${name}/package.json`, JSON.stringify(data, null, 2))
  }

  /*
    fetching from repository
  */
  toolbox.getTSConfig = async (): Promise<void> => {
    /*
    const { data } = await api.get('tsconfig.json')
    write(`./${name}/tsconfig.json`, JSON.stringify(data, null, 2))
    */
    await template.generate({
      template: 'tsconfig.json.ejs',
      target: `${name}/tsconfig.json`,
      props: { name },
    })
  }

  /*
    fetching from repository
  */
  toolbox.getTestConfig = async (): Promise<void> => {
    const { data } = await api.get('jest.config.json')
    write(`./${name}/jest.config.json`, `${JSON.stringify(data, null, 2)}`)
  }

  /*
    using templates
  */
  toolbox.generateReadme = async (): Promise<void> => {
    await template.generate({
      template: 'readme.ejs',
      target: `${name}/README.md`,
      props: { name },
    })
  }

  /*
    using templates
  */
  toolbox.generateGitignore = async (): Promise<void> => {
    const props = {
      template: 'gitignore.ejs',
      target: `${name}/.gitignore`,
    }

    await template.generate({ ...props })
  }

  /*
    fetching from repository &
    using templates
  */
  toolbox.getLintingConfig = async (): Promise<void> => {
    const { data } = await api.get('.prettierrc')
    write(`./${name}/.prettierrc`, `${JSON.stringify(data, null, 2)}`)

    await template.generate({
      template: 'prettierignore.ejs',
      target: `${name}/.prettierignore`,
    })
  }

  toolbox.generateRoot = (): void => {
    Promise.all([
      toolbox.getWebpack(),
      toolbox.getPackageJSON(),
      toolbox.getTSConfig(),
      toolbox.getTestConfig(),
      toolbox.generateGitignore(),
      toolbox.generateReadme(),
      toolbox.getLintingConfig(),
    ])
  }
}
