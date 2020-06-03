# peppino

[![NPM Version](http://img.shields.io/npm/v/peppino.svg?style=flat)](https://www.npmjs.org/package/peppino)
[![NPM Downloads](https://img.shields.io/npm/dm/peppino.svg?style=flat)](https://www.npmjs.org/package/peppino)
[![JS Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

preset of pino

## Purpose

Have a ready-to-use rich tool for dev and debug while use great [pino](https://github.com/pinojs) performace in production.

## Installing

````bash
npm i peppino
````

## Quick start

singleton

```js
const log = require('peppino')
log.init()

log.warn({ message: 'info' })
```

singleton

```js
const log = require('peppino')
const _logger1 = log.init({ singleton: false, level: 'info' })
const _logger2 = log.init({ singleton: false, level: 'silent' })

_logger1.info({ message: 'info' })
_logger2.info({ message: 'none' })
```

## Settings

Default settings:

```js
{
  level: 'warn',
  pretty: false,
  version: '',
  singleton: true
}
```

- level
  set logger level: one
- pretty
  pretty output
- version
  append version on each log entry
- singleton
  use the singleton or create a new indipendent instance with different settings

## Methods

### .init

init logger with settings, everything is optional

### .set

update settings for the singleton or existing instance

### .timer

utility for measure time

```js
const log = require('peppino')
log.init()

log.timer('db-query')
// db.query ...
log.info({ message: 'query execution', time: log.timer('db-query') })
```

> {"level":"INFO","time":1591218836285,"message":"query execution","timer":"123 ms"}

### .pino

you may need the pino original instance with current settings

```js
const log = require('peppino')
log.init()

const pino = log.pino()
```

## TODO

- [ ] settings: mode dev, test, prod
- [ ] namespaces enable/disable
- [ ] level enable/disable
- [ ] level marker
- [ ] full trace by `stack-trace`
- [ ] timer (expiration in settings)

---

## License

The MIT License (MIT)

Copyright (c) 2020 [Simone Sanfratello](https://braceslab.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
