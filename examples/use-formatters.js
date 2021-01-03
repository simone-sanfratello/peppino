'use strict'

const log = require('../src/peppino')
log.init({ pretty: true })

log.error({
  ns: 'socket',
  message: 'connection timeout',
  'timestamp:epoch': Date.now()
})
