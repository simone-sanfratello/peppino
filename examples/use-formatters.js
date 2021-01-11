'use strict'

const log = require('peppino')
log.init({ pretty: true })

log.error({ message: 'connection timeout', 'timestamp:epoch': Date.now(), ns: 'socket' })

log.warn({ message: 'file saved', 'size:filesize': 1024 * 1024, ns: 'file-server' })
