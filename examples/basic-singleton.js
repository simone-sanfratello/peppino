'use strict'

const log = require('../src/peppino')
log.init({ pretty: true, level: 'info' })

log.info({ message: 'order received', payload: { order: { id: '1123abc', items: ['pizza','beer','rum'] } } })
log.error({ message: 'oh no!', error: new Error('SOMETHING_WRONG') })
