import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {
  const { template, parameters, print: { info } } = toolbox;
  const name = parameters.first;
  const path = `./${name}/src`;

  toolbox.generateAppTSX = async (): Promise<void> => {
    const props = {
      template: 'app.tsx.ejs',
      target: `${path}/app.tsx`,
    };

    await template.generate({...props});
    info(`app.tsx from ${name} has been created!`);
  };

  toolbox.generateAppSASS = async(): Promise<void> => {
    const props = {
      template: 'app.sass.ejs',
      target: `${path}/app.sass`,
    };

    await template.generate({...props});
    info(`app.sass from ${name} has been created!`);
  };

  toolbox.generateProjectIndex = async(): Promise<void> => {
    const props = {
      template: 'index.tsx.ejs',
      target: `${path}/index.tsx`,
    };

    await template.generate({...props});
    info(`Project index from ${name} has been created!`);
  };
};
