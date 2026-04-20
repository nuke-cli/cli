import { system, filesystem } from 'gluegun'

const src = filesystem.path(__dirname, '..')
const name = 'project'
let output: string // used into the artifact
// let io: MockSTDIN// used into the artifact

const terminal = async (cmd: string) =>
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

  describe('into root', () => {
    test('creates webpack.config', () => {
      const file = filesystem.read(`${name}/webpack.config.js`)
      expect(file).toContain(
        "entry: path.resolve(__dirname, 'src', 'index.tsx'),",
      )
      expect(file).toContain("path: path.resolve(__dirname, 'build'),")
    })

    test('creates package.json', () => {
      const file = filesystem.read(`${name}/package.json`)
      expect(file).toContain('dependencies')
      expect(file).toContain('devDependencies')
    })

    test('creates tsconfig.json', () => {
      const file = filesystem.read(`${name}/tsconfig.json`)
      expect(file).toContain('compilerOptions')
    })

    test('creates jest.config.json', () => {
      const file = filesystem.read(`${name}/jest.config.json`)
      // error while reading json file
      // find a workaround in the future
      expect(file).toBeTruthy()
    })

    test('creates .gitignore', () => {
      const file = filesystem.read(`${name}/.gitignore`)
      expect(file).toContain('node_modules')
    })

    test('creates README.md', () => {
      const file = filesystem.read(`${name}/README.md`)
      expect(file).toBeTruthy()
    })

    test('creates linting settings', () => {
      const prettierRc = filesystem.read(`${name}/.prettierrc`)
      const prettierIgnore = filesystem.read(`${name}/.prettierignore`)

      // error while reading json file
      // find a workaround in the future
      expect(prettierRc).toBeTruthy()
      expect(prettierIgnore).toContain('node_modules/')
      expect(prettierIgnore).toContain('.github')
    })
  })

  describe('into src folder', () => {
    test('creates app setup', () => {
      const appTSX = filesystem.read(`${name}/src/App.tsx`)
      const appTest = filesystem.read(`${name}/src/App.test.tsx`)

      expect(appTSX).toBeTruthy()
      expect(appTest).toBeTruthy()
    })

    test('creates index setup', () => {
      const appSASS = filesystem.read(`${name}/src/index.sass`)
      const indexTSX = filesystem.read(`${name}/src/index.tsx`)

      expect(appSASS).toBeTruthy()
      expect(indexTSX).toBeTruthy()
    })
  })

  describe('into public folder', () => {
    test('creates html file', () => {
      const indexHTML = filesystem.read(`${name}/public/index.html`)
      expect(indexHTML).toBeTruthy()
    })
  })

  test('prints success message', () => {
    expect(output).toContain(`Project ${name} has been created! Have fun.`)
  })
})
