'use strict'

const TIMER_MAX_DURATION = 10 * 60 * 1000
const _timers = {}
const _gc = {}

/**
 * start/stop timer
 * note: remember to stop timer once started, or wait gc for TIMER_MAX_DURATION
 */
function timer (tag) {
  if (!_timers[tag]) {
    _timers[tag] = Date.now()

    _gc[tag] = setTimeout(() => {
      delete _timers[tag]
    }, TIMER_MAX_DURATION)

    return `${tag} chrono start`
  }
  const _now = Date.now()
  const duration = _now - _timers[tag] + ' ms'
  delete _timers[tag]
  clearTimeout(_gc[tag])
  return duration
}

module.exports = timer
