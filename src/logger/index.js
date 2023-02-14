import VueLogger from 'vue-logger-plugin'

// define options
const options = {
  enabled: true,
  level: 'debug'
  //   beforeHooks: [ ... ],
  //   afterHooks: [ ... ]
}

// export logger with applied options
export default new VueLogger(options)
