const tap = require('tap')
const peppino = require('../src/peppino')

const LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']

tap.test('peppino.init default', test => {
  test.plan(1)

  peppino.init()
  peppino.error({ message: 'error' })

  test.pass()
})

tap.test('peppino.init singleton', test => {
  test.plan(1)

  peppino.init({ singleton: true })
  peppino.fatal({ message: 'fatal' })

  test.pass()
})

tap.test('peppino.init instance', test => {
  test.plan(1)

  const _peppino1 = peppino.init({ singleton: false })
  _peppino1.fatal({ message: 'fatal' })

  const _peppino2 = peppino.init({ singleton: false })
  _peppino2.fatal({ message: 'fatal', error: new Error('PANIC!') })

  test.pass()
})

tap.test('peppino.set', test => {
  test.plan(1)

  const _peppino = peppino.init({ pretty: true, singleton: false })
  _peppino.error({ message: 'error', error: new Error('A_ERROR') })
  _peppino.set()

  test.pass()
})

tap.test('peppino.timer', test => {
  test.plan(1)

  peppino.timer('tag')

  test.match(peppino.timer('tag'), /\d+ ms/)
})

tap.test('peppino.pino', test => {
  test.plan(1)

  test.pass()
})

tap.test('peppino.pino', test => {
  test.plan(1)

  peppino.set({ pretty: false })
  peppino.pino().error({ message: 'error', error: new Error('A_ERROR') })

  test.pass()
})

tap.test('levels', test => {
  test.plan(LEVELS.length)

  for (const level of LEVELS) {
    const _peppino = peppino.init({ singleton: false, level, version: '0.1' })
    _peppino[level]({ message: level })
    test.pass()
  }

})
