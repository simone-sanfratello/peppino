'use strict'

const pino = require('pino')

const LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace']

let _logger
const _timers = {}

/**
 * pino wrapper with custom settings
 */
const log = {
  init: function (settings) {
    if (_logger) {
      _logger.warn({ message: 'logger already initialized' })
      return
    }
    const prettyOptions = {
      messageKey: 'message',
      customPrettifiers: {
        error: error => {
          const stack = error.stack.split('\n').splice(1).map((line) => '\n  ' + line.trim()).join('')
          return 'Error: ' + error.message + '\nstack: ' + stack
        }
      }
    }

    _logger = pino({
      level: settings.level || 'info',
      prettyPrint: settings.pretty ? prettyOptions : false,
      base: settings.version ? { version: settings.version } : {},
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

    for (const level of LEVELS) {
      log[level] = _logger[level].bind(_logger)
    }
  },

  /**
   * start/stop timer
   * note: remember to stop timer once started
   */
  timer: function (tag) {
    if (!_timers[tag]) {
      _timers[tag] = Date.now()
      return
    }
    const _now = Date.now()
    const duration = _timers[tag] ? (_now - _timers[tag]) + ' ms' : 'n/a'
    delete _timers[tag]
    return duration
  },

  pino: () => {
    return _logger
  }
}

module.exports = log
