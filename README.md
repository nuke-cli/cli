# nuke-cli [![CI](https://github.com/cl4pper/nuke-cli/actions/workflows/integration.yaml/badge.svg)](https://github.com/cl4pper/nuke-cli/actions/workflows/integration.yaml) [![Publish](https://github.com/cl4pper/nuke-cli/actions/workflows/publish.yaml/badge.svg)](https://github.com/cl4pper/nuke-cli/actions/workflows/publish.yaml)

[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/nuke-cli)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/cl4pper/nuke-cli)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

> A CLI focused on powering the start of your web project.

Have a look at the original [boilerplate](https://github.com/cl4pper/react-setup).

### Features:

In this version you'll be able to create a React project from zero

- React powered by [TypeScript](https://www.npmjs.com/package/typescript)
- [webpack](https://www.npmjs.com/package/webpack) as the module bundler
- unit tests run by [Jest](https://www.npmjs.com/package/jest) and [React Testing Library](https://www.npmjs.com/package/@testing-library/react)
- local code lintintg by [Prettier](https://www.npmjs.com/package/prettier)
- Docker settings
- React component template generator (.tsx, .sass, .test.tsx)

Coming up...

- CI by Github actions
- **generate a Node based API** from zero

## Instructions:

> Install the package by: `npm install -g nuke-cli`

> Starting a project: `nuke start:ts <INSERT_PROJECT_NAME>`

```
> nuke start:ts fun-project
> Project fun-project has been created! Have fun.
```

> Generating a React component: `nuke component:ts <INSERT_COMPONENT_NAME>`

```
> nuke component:ts fun-button
> Component fun-button folder has been created.
```

## Misc:

Folder structure inside the project folder:

```
/build
-- index.html
/src
-- App.sass
-- App.tsx
-- index.tsx
.babelrc
.dockerignore
.gitignore
.prettierignore
.prettierrc
docker-compose.yml
Dockerfile
jest.config.json
package.json
README.md
tsconfig.json
webpack.config.json
```

##

Engineered by [Gluegun](https://github.com/infinitered/gluegun).
