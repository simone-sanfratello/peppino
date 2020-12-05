'use strict'

const pino = require('pino')
const validate = require('./validate')

const LEVELS = ['panic', 'fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']

let _singleton
const _timers = {}

const prettyOptions = {
  messageKey: 'message',
  customPrettifiers: {
    error: error => {
      const stack = error.stack.split(',').map((line) => '\n    ' + line.trim()).join('')
      return '\n  message: ' + error.message + '\n  stack: ' + stack
    }
  }
}

/**
   * start/stop timer
   * note: remember to stop timer once started
   */
function timer (tag) {
  if (!_timers[tag]) {
    _timers[tag] = Date.now()
    return
  }
  const _now = Date.now()
  const duration = _now - _timers[tag] + ' ms'
  delete _timers[tag]
  return duration
}

/**
 * pino wrapper with custom settings
 */
const log = {
  init: function (settings = {}) {
    settings = validate(settings)

    if (settings.singleton) {
      if (_singleton) {
        _singleton.warn({ message: 'logger (singleton) already initialized' })
        return
      }
      _singleton = log.set(settings)
      for (const level of LEVELS) {
        log[level] = _singleton[level].bind(_singleton)
      }
      return log
    } else {
      return log.set(settings)
    }
  },

  set: function (settings = {}) {
    settings = validate(settings)
    const base = {}
    if (settings.version) {
      base.version = settings.version
    }
    if (settings.name) {
      base.name = settings.name
    }

    const logger = pino({
      level: settings.level,
      prettyPrint: settings.pretty ? prettyOptions : false,
      base,
      customLevels: { panic: 90 },
      formatters: {
        level (label, _number) {
          return { level: label.toUpperCase() }
        }
      },
      serializers: {
        error: error => {
          const stack = error.stack.split('\n').splice(1).map(line => line.trim()).join(',')
          return {
            message: error.message,
            code: error.code,
            stack: stack
          }
        }
      }
    })

    logger.timer = log.timer
    logger.set = log.set
    logger.pino = () => logger

    return logger
  },

  timer,

  pino: () => _singleton
}

module.exports = log
