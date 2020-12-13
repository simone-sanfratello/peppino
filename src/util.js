'use strict'

const util = {
  wait: function wait (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
  pad2: function (value) {
    return value < 10 ? '0' + value : String(value)
  },
  pad3: function (value) {
    if (value < 10) { return '00' + value }
    if (value < 100) { return '0' + value }
    return String(value)
  },
  tz: function (date) {
    const min = date.getTimezoneOffset()
    const amin = Math.abs(min)
    return (min < 0 ? '-' : '+') + util.pad2(Math.floor(amin / 60)) + util.pad2(Math.floor(amin % 60))
  },
  format: {
    date: function (date) {
      return date.getFullYear() + util.pad2(1 + date.getMonth()) + util.pad2(date.getDate())
    },
    time: function (date) {
      return [
        util.pad2(date.getHours()),
        util.pad2(date.getMinutes()),
        util.pad2(date.getSeconds())
      ].join(':') +
      '.' + util.pad3(date.getMilliseconds())
    }
  }
}

module.exports = util
