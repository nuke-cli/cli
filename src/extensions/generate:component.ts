import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {
  const { template, parameters, filesystem: { append, write, read } } = toolbox
  const name = parameters.first
  const path = `src/components/${name}/`

  toolbox.generateTSX = async (): Promise<void> => {
    const props = {
      template: 'component.tsx.ejs',
      target: `${path}/component.tsx`,
      props: { name },
    }

    await template.generate({ ...props })
  }

  toolbox.generateSASS = async (): Promise<void> => {
    const props = {
      template: 'component.sass.ejs',
      target: `${path}/component.sass`,
      props: { name },
    }

    await template.generate({ ...props })
  }

  toolbox.generateTests = async (): Promise<void> => {
    const props = {
      template: 'component.test.ejs',
      target: `${path}/component.test.tsx`,
      props: { name },
    }

    await template.generate({ ...props })
  }

  toolbox.appendComponentIndex = async (): Promise<void> => {
    const data = `export { default as ${name} } from './${name}/component'`;

    if(!read('src/components/index.ts')) return write('src/components/index.ts', data);
    
    append('src/components/index.ts', data)
  }

  toolbox.generateComponent = async () => {
    Promise.all([
      toolbox.generateTSX(),
      toolbox.generateSASS(),
      toolbox.generateTests(),
      toolbox.appendComponentIndex()
    ])
  }
}
