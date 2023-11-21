import { system, filesystem } from 'gluegun'

const src = filesystem.path(__dirname, '..')
const name = 'project'
let output: string // used into the artifact

const terminal = async (cmd) =>
  system.run('node ' + filesystem.path(src, 'bin', 'nuke-cli') + ` ${cmd}`)

describe('start:ts', () => {
  beforeAll(async () => {
    output = await terminal(`start:ts ${name}`)
  })

  afterAll(() => {
    // remove the artifact
    filesystem.remove(`${name}`)
  })

  describe('generates root folder', () => {
    test('creates webpack.config into root', () => {
      const w = filesystem.read(`${name}/webpack.config.js`)
      expect(w).toBeTruthy()
    })

    test('creates .babelrc into root', () => {
      const b = filesystem.read(`${name}/.babelrc`)
      expect(b).toBeTruthy()
    })

    test('creates package.json into root', () => {
      const p = filesystem.read(`${name}/package.json`)
      expect(p).toBeTruthy()
    })

    test('creates tsconfig.json into root', () => {
      const t = filesystem.read(`${name}/tsconfig.json`)
      expect(t).toBeTruthy()
    })

    test('creates jest.config.json into root', () => {
      const j = filesystem.read(`${name}/jest.config.json`)
      expect(j).toBeTruthy()
    })

    test('creates .gitignore into root', () => {
      const g = filesystem.read(`${name}/.gitignore`)
      expect(g).toBeTruthy()
    })

    test('creates README.md into root', () => {
      const r = filesystem.read(`${name}/README.md`)
      expect(r).toBeTruthy()
    })
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
