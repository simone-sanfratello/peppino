const superstruct = require('superstruct')
const default_ = {
  level: 'warn',
  pretty: false,
  version: '',
  singleton: true
}

const s = superstruct.struct

const settings = s({
  level: s.optional(s.enum(['debug', 'trace', 'info', 'warn', 'error', 'fatal', 'silent'])),
  pretty: 'boolean?',
  version: 'string?',
  singleton: 'boolean?'
}, default_)

module.exports = settings
