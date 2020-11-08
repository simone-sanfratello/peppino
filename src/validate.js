'use strict'

const s = require('superstruct')
const default_ = {
  level: 'warn',
  pretty: false,
  version: '',
  name: '',
  singleton: true
}

const settings = s.defaulted(
  s.object({
    level: s.optional(s.enums(['debug', 'trace', 'info', 'warn', 'error', 'fatal', 'panic', 'silent'])),
    pretty: s.optional(s.boolean()),
    version: s.optional(s.string()),
    name: s.optional(s.string()),
    singleton: s.optional(s.boolean())
  }), default_
)

function validate (value) {
  return s.coerce(value, settings)
}

module.exports = validate
