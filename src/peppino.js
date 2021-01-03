'use strict'

const pino = require('pino')

const timer = require('./timer')
const validate = require('./validate')
const pretty = require('./pretty')

const LEVELS = ['panic', 'fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']

let _singleton

function formatters (settings) {
  return {
    level (label, _number) {
      return { level: label.toUpperCase() }
    }
  }
}

function serializers (settings) {
  return {
    error: error => {
      const stack = error.stack.split('\n').splice(1).map(line => line.trim()).join(',')
      return {
        message: error.message,
        code: error.code,
        stack: stack
      }
    }
  }
}

function toPinoSettings (settings) {
  const base = {}
  if (settings.version) {
    base.version = settings.version
  }
  if (settings.name) {
    base.name = settings.name
  }

  return {
    level: settings.level,
    prettyPrint: false,
    base,
    customLevels: {
      panic: 90,
      fail: 35,
      success: 35
    },
    formatters: settings.pretty ? pretty.formatters(settings) : formatters(settings),
    serializers: serializers(settings),
    ...settings.original
  }
}

/**
 * pino wrapper with custom settings
 */
const log = {
  init: function (settings = {}) {
    settings = validate(settings)

    if (!settings.singleton) {
      return log.set(settings)
    }
    if (_singleton) {
      _singleton.warn({ message: 'logger (singleton) already initialized' })
      return
    }
    _singleton = log.set(settings)

    for (const level of LEVELS) {
      log[level] = _singleton[level].bind(_singleton)
    }
    log.printing = _singleton.isLevelEnabled.bind(_singleton)
    return log
  },

  set: function (settings = {}) {
    settings = validate(settings)
    const logger = pino(toPinoSettings(settings),
      settings.pretty && pretty.output(settings)
    )

    logger.timer = log.timer
    logger.set = log.set
    logger.pino = () => logger

    return logger
  },

  timer,

  pino: () => _singleton
}

module.exports = log
