'use strict'

const { Transform } = require('stream')
const chalk = require('chalk')
const jstringify = require('json-stringify-extended')
const toolbox = require('a-toolbox')
const util = require('./util')
let formatters = require('./formatters')

const STRINGIFY_OPTIONS = {
  keySpace: true,
  safe: true,
  replace: function (key, value) {
    let format
    if (key === 'error' || value instanceof Error) {
      // nb already serialized by pino
      const stack = value.stack.split(',')
        .map(line => `\n    > ${line}`).join('')
      return { key, value: { ...value, stack } }
    } else if (key && toolbox.util.isSet(value) && (format = key.indexOf(':')) > 1) {
      const formatter = key.substr(format + 1)
      let f
      if ((f = formatters[formatter])) {
        return { key: key.substr(0, format), value: f(value) }
      }
    }
    return { key, value }
  }
}

function stringify (payload) {
  if (Object.keys(payload).length < 1) {
    return ''
  }
  const stringified = jstringify(payload, STRINGIFY_OPTIONS)
    .replace(/\\n/mg, '\n')
    .replace(/\n/mg, '\n  ')
    .split('\n')
  stringified.pop()
  stringified.shift()
  return stringified.join('\n')
}

const pretty = {
  output: function prettyOutput (settings) {
    const filter = settings.namespaces && settings.namespaces.filter
    if (settings.formatters) {
      formatters = {
        ...formatters,
        ...settings.formatters
      }
    }
    return new Transform({
      defaultEncoding: 'utf8',
      transform (chunk, _encoding, callback) {
        const log = JSON.parse(chunk)
        const { level, time, message, name, ns, ...payload } = log

        if (ns && filter) {
          if ((typeof filter === 'string' && ns !== filter) ||
              (filter instanceof Array && !filter.includes(ns)) ||
              (filter instanceof RegExp && !filter.test(ns))
          ) {
            callback()
            return
          }
        }

        const ftime = util.format.time(new Date(time))
        const fname = name ? `[${name}]` : ''
        const fns = ns ? chalk.bgYellow.black(`[${ns}]`) : ''
        const fmessage = `\n  ${chalk.bgBlue('[message]')} ${chalk.italic(message)}`
        const fpayload = stringify(payload)

        const output = `\n${ftime} ${fname}${fns} ${level}${fmessage}\n${fpayload}\n`

        process.stdout.write(output)
        callback()
      }
    })
  },

  formatters: function prettyFormatters (settings) {
    const markes = settings.markers
    const colors = settings.colors
    return {
      level (label, _number) {
        return { level: chalk.bold[colors[label]](markes[label] + ' ' + label.toUpperCase()) }
      }
    }
  }

}

module.exports = pretty
