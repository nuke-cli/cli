import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {
  const { template, parameters } = toolbox;
  const name = parameters.first;
  const path = `./${name}/build`;

  toolbox.generateIndexHTML = async (): Promise<void> => {
    const props = {
      template: 'index.html.ejs',
      target: `${path}/index.html`,
    };

    await template.generate({...props});
  };
};