'use strict'

const formatters = {
  epoch: (value) => (new Date(value)).toISOString(),
  filesize: (value) => {
    const i = Math.floor(Math.log(value) / Math.log(1024))
    return (value / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
  }
}

module.exports = formatters
