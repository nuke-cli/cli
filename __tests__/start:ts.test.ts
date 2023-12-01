import { system, filesystem } from 'gluegun'

const src = filesystem.path(__dirname, '..')
const name = 'project'
let output: string // used into the artifact
// let io: MockSTDIN// used into the artifact

const terminal = async (cmd) =>
  system.run('node ' + filesystem.path(src, 'bin', 'nuke-cli') + ` ${cmd}`)

describe('start:ts', () => {
  beforeAll(async () => {
    output = await terminal(`start:ts ${name}`)
    //io = stdin()
  })

  afterAll(() => {
    filesystem.remove(`${name}`)
    //io.restore()
  })

  describe('generates root folder', () => {
    test('setup webpack.config', () => {
      const file = filesystem.read(`${name}/webpack.config.js`)
      expect(file).toContain(
        "entry: path.resolve(__dirname, 'src', 'index.tsx'),"
      )
      expect(file).toContain("path: path.resolve(__dirname, 'build'),")
      expect(file).toContain("filename: 'bundle.js',")
    })

    test('setup .babelrc', () => {
      const file = filesystem.read(`${name}/.babelrc`)
      expect(file).toContain('presets')
      expect(file).toContain('plugins')
    })

    test('setup package.json', () => {
      const file = filesystem.read(`${name}/package.json`)
      expect(file).toContain('dependencies')
      expect(file).toContain('devDependencies')
    })

    test('setup tsconfig.json', () => {
      const file = filesystem.read(`${name}/tsconfig.json`)
      expect(file).toContain('compilerOptions')
    })

    test('setup jest.config.json', () => {
      const file = filesystem.read(`${name}/jest.config.json`)
      // error while reading json file
      // find a workaround in the future
      expect(file).toBeTruthy()
    })

    test('setup .gitignore', () => {
      const file = filesystem.read(`${name}/.gitignore`)
      expect(file).toContain('node_modules')
    })

    test('setup README.md', () => {
      const file = filesystem.read(`${name}/README.md`)
      expect(file).toBeTruthy()
    })

    test('setup linting settings', () => {
      const prettierRc = filesystem.read(`${name}/.prettierrc`)
      const prettierIgnore = filesystem.read(`${name}/.prettierignore`)

      // error while reading json file
      // find a workaround in the future
      expect(prettierRc).toBeTruthy()
      expect(prettierIgnore).toContain('node_modules/')
      expect(prettierIgnore).toContain('.github')
    })

    test('setup Docker settings into root', () => {
      const dockerfile = filesystem.read(`${name}/Dockerfile`)
      const dockerignore = filesystem.read(`${name}/.dockerignore`)
      const dockerCompose = filesystem.read(`${name}/docker-compose.yml`)

      expect(dockerfile).toContain('WORKDIR /app')
      expect(dockerfile).toContain('COPY package.json ./')
      expect(dockerignore).toContain('node_modules')
      expect(dockerignore).toContain('Dockerfile')
      expect(dockerCompose).toContain('services:')
      expect(dockerCompose).toContain('dockerfile: Dockerfile')
    })

    /*
    ** Test for prompt interactions
    ** Must be reviewed
    ** Original example from example from https://shift.infinite.red/integration-testing-interactive-clis-93af3cc0d56f

    test('creates linting settings', async done => {
      const keys = {
        up: '\x1B\x5B\x41',
        down: '\x1B\x5B\x42',
        enter: '\x0D',
        space: '\x20'
      }

      const sendKeystrokes = async () => {
        io.send(keys.down)
        io.send(keys.enter)
      }
      setTimeout(() => sendKeystrokes().then(), 5)

      const answer = await prompt.ask({
        name: 'lint',
        type: 'select',
        message: 'Generate linting settings (prettier)?',
        choices: ['No', 'Yes']
      })

      expect(answer).toEqual({ lint: 'Yes' })

      const prettierRc = filesystem.read(`${name}/.prettierrc`)
      const prettierIgnore = filesystem.read(`${name}/.prettierignore`)

      expect(prettierRc).toBeTruthy()
      expect(prettierIgnore).toBeTruthy()

      done();
    })
    */
  })

  describe('generates /src', () => {
    test('creates app.tsx into /src', () => {
      const appTSX = filesystem.read(`${name}/src/App.tsx`)
      expect(appTSX).toBeTruthy()
    })

    test('creates app.sass into /src', () => {
      const appSASS = filesystem.read(`${name}/src/App.sass`)
      expect(appSASS).toBeTruthy()
    })

    test('creates index.tsx into /src', () => {
      const indexTSX = filesystem.read(`${name}/src/index.tsx`)
      expect(indexTSX).toBeTruthy()
    })
  })

  describe('generates /build', () => {
    test('creates html into /build', () => {
      const indexHTML = filesystem.read(`${name}/build/index.html`)
      expect(indexHTML).toBeTruthy()
    })
  })

  test('prints success message', () => {
    expect(output).toContain(`Project ${name} has been created! Have fun.`)
  })
})
