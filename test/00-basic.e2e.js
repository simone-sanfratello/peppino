'use strict'

const tap = require('tap')
const peppino = require('../src/peppino')

const LEVELS = ['panic', 'fatal', 'error', 'warn', 'success', 'fail', 'info', 'debug', 'trace', 'silent']

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

  const _peppino2 = peppino.init({ singleton: false, name: 'service-auth' })
  _peppino2.panic({ message: 'cant start app', error: new Error('PANIC!') })

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
  test.plan(2)

  test.equal(peppino.timer('tag'), 'tag chrono start')
  test.match(peppino.timer('tag'), /\d+ ms/)
})

tap.test('peppino.pino', test => {
  test.plan(1)

  peppino.set({ pretty: false })
  peppino.pino().error({ message: 'error', error: new Error('A_ERROR') })

  test.pass()
})

tap.test('peppino options', test => {
  test.plan(1)

  const _peppino = peppino.init({ singleton: false, pretty: false, name: 'auth-service', version: '0.0.1' })
  _peppino.error({ message: 'welcome' })

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

tap.test('namespace string', test => {
  test.plan(1)

  const _peppino = peppino.init({
    singleton: false,
    pretty: true,
    level: 'info',
    name: 'auth-service',
    namespaces: { filter: 'db' }
  })
  _peppino.success({ ns: 'db', message: 'connected' })
  _peppino.error({
    ns: 'socket',
    message: 'connection timeout',
    socket: { address: '192.168.100.123', port: 9909 }
  })

  test.pass()
})

tap.test('namespace array', test => {
  test.plan(1)

  const _peppino = peppino.init({
    singleton: false,
    pretty: true,
    level: 'info',
    name: 'auth-service',
    namespaces: { filter: ['db'] }
  })
  _peppino.success({ ns: 'db', message: 'connected' })
  _peppino.error({
    ns: 'socket',
    message: 'connection timeout',
    socket: { address: '192.168.100.123', port: 9909 }
  })

  test.pass()
})

tap.test('namespace regexp', test => {
  test.plan(1)

  const _peppino = peppino.init({
    singleton: false,
    pretty: true,
    level: 'info',
    name: 'auth-service',
    namespaces: { filter: /db/ }
  })
  _peppino.success({ ns: 'db', message: 'connected' })
  _peppino.error({
    ns: 'socket',
    message: 'connection timeout',
    socket: { address: '192.168.100.123', port: 9909 }
  })

  test.pass()
})

/*

@todo
peppino.original
*/
