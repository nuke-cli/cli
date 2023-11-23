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
    test('setup webpack.config into root', () => {
      const w = filesystem.read(`${name}/webpack.config.js`)
      expect(w).toBeTruthy()
    })

    test('setup .babelrc into root', () => {
      const b = filesystem.read(`${name}/.babelrc`)
      expect(b).toBeTruthy()
    })

    test('setup package.json into root', () => {
      const p = filesystem.read(`${name}/package.json`)
      expect(p).toBeTruthy()
    })

    test('setup tsconfig.json into root', () => {
      const t = filesystem.read(`${name}/tsconfig.json`)
      expect(t).toBeTruthy()
    })

    test('setup jest.config.json into root', () => {
      const j = filesystem.read(`${name}/jest.config.json`)
      expect(j).toBeTruthy()
    })

    test('setup .gitignore into root', () => {
      const g = filesystem.read(`${name}/.gitignore`)
      expect(g).toBeTruthy()
    })

    test('setup README.md into root', () => {
      const r = filesystem.read(`${name}/README.md`)
      expect(r).toBeTruthy()
    })

    test('setup linting settings into root', () => {
      const prettierRc = filesystem.read(`${name}/.prettierrc`)
      const prettierIgnore = filesystem.read(`${name}/.prettierignore`)

      expect(prettierRc).toBeTruthy()
      expect(prettierIgnore).toBeTruthy()
    })

    test('setup Docker settings into root', () => {
      const dockerfile = filesystem.read(`${name}/Dockerfile`)
      const dockerignore = filesystem.read(`${name}/.dockerignore`)
      const dockerCompose = filesystem.read(`${name}/docker-compose.yml`)

      expect(dockerfile).toBeTruthy()
      expect(dockerignore).toBeTruthy()
      expect(dockerCompose).toBeTruthy()
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
