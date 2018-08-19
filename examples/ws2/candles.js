'use strict'

process.env.DEBUG = '*' // 'bfx:api:examples:*'

const debug = require('debug')('bfx:api:examples:ws2:candles')
const { Manager } = require('bfx-api-node-core')
const subscribe = require('bfx-api-node-core/lib/ws2/subscribe')

const CANDLE_KEY = 'trade:5m:tBTCUSD'
const mgr = new Manager({ transform: true })

mgr.onWS('open', {}, (state = {}) => {
  debug('open')

  let wsState = state
  wsState = subscribe(wsState, 'candles', { key: CANDLE_KEY })
  return wsState
})

mgr.onWS('candles', { key: CANDLE_KEY }, (candles) => {
  candles.forEach(candle => {
    debug('recv BTCUSD candle: %j', candle)
  })
})

mgr.openWS()
