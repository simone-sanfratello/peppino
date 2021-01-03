'use strict'

const log = require('../src/peppino')
const _logger1 = log.init({ singleton: false, pretty: true, level: 'info' })
const _logger2 = log.init({ singleton: false, level: 'silent' })

_logger1.info({ message: 'info' })
_logger2.info({ message: 'none' })
