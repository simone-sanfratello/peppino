'use strict'

const s = require('superstruct')
const default_ = {
  level: 'warn',
  pretty: false,
  version: '',
  name: '',
  namespaces: {
    filter: null
  },
  singleton: true,
  markers: {
    debug: '🐞',
    trace: '💬',
    info: 'ℹ️',
    warn: '❗',
    error: '❌',
    fatal: '💥',
    panic: '😱',
    success: '🗸',
    fail: '💢'
  },
  colors: {
    debug: 'blue',
    trace: 'grey',
    info: 'cyan',
    warn: 'yellow',
    error: 'red',
    fatal: 'magenta',
    panic: 'magenta',
    success: 'green',
    fail: 'yellow'
  },
  original: {}
}

const settings = s.defaulted(
  s.object({
    level: s.optional(s.enums(['debug', 'trace', 'info', 'warn', 'error', 'fatal', 'panic', 'success', 'fail', 'silent'])),
    pretty: s.optional(s.boolean()),
    version: s.optional(s.string()),
    name: s.optional(s.string()),
    namespaces: s.optional(s.object({
      filter: s.optional(s.nullable(s.any(s.string()), s.array(s.string()), s.object()))
    })),
    singleton: s.optional(s.boolean()),
    markers: s.optional(s.object({
      debug: s.optional(s.string()),
      trace: s.optional(s.string()),
      info: s.optional(s.string()),
      warn: s.optional(s.string()),
      error: s.optional(s.string()),
      fatal: s.optional(s.string()),
      panic: s.optional(s.string()),
      success: s.optional(s.string()),
      fail: s.optional(s.string())
    })),
    colors: s.optional(s.object({
      debug: s.optional(s.string()),
      trace: s.optional(s.string()),
      info: s.optional(s.string()),
      warn: s.optional(s.string()),
      error: s.optional(s.string()),
      fatal: s.optional(s.string()),
      panic: s.optional(s.string()),
      success: s.optional(s.string()),
      fail: s.optional(s.string())
    })),
    original: s.optional(s.object())
  }), default_
)

function validate (value) {
  return s.coerce(value, settings)
}

module.exports = validate
