import { system, filesystem } from 'gluegun'

const src = filesystem.path(__dirname, '..')
const name = 'component'
const path = `src/components/${name}`
let output: string // used into the artifact

const CLI = async (cmd) =>
  system.run('node ' + filesystem.path(src, 'bin', 'nuke-cli') + ` ${cmd}`)

describe('component:ts', () => {
  beforeAll(async () => {
    output = await CLI(`component:ts ${name}`)
  })

  afterAll(() => {
    filesystem.remove('src/components')
  })

  describe('component .tsx file', () => {
    test('is created', () => {
      const file = filesystem.read(`${path}/component.tsx`)
      expect(file).toBeTruthy()
    })
  })

  describe('component .sass file', () => {
    test('is created', () => {
      const file = filesystem.read(`${path}/component.sass`)
      expect(file).toBeTruthy()
    })
  })

  describe('component .test.tsx file', () => {
    test('is created', () => {
      const file = filesystem.read(`${path}/component.test.tsx`)
      expect(file).toBeTruthy()
    })
  })

  describe('index file into /component', () => {
    test('does exist', () => {
      const file = filesystem.read('src/components/index.ts')
      expect(file).toBeTruthy()
    })
  })

  test('prints success message', () => {
    expect(output).toContain(`Component ${name} folder has been created.`)
  })
})

describe('component:ts - no name parameter', () => {
  beforeAll(async () => {
    output = await CLI('component:ts')
  })

  describe('component .tsx file', () => {
    test('is not created', () => {
      expect(filesystem.read(`${path}/component.tsx`)).toBeFalsy()
    })
  })

  describe('component .sass file', () => {
    test('is not created', () => {
      expect(filesystem.read(`${path}/component.tsx`)).toBeFalsy()
    })
  })

  describe('component .test.tsx file', () => {
    test('is not created', () => {
      expect(filesystem.read(`${path}/component.tsx`)).toBeFalsy()
    })
  })

  test('prints failure message', () => {
    expect(output).toContain('A name for component is required!')
  })
})