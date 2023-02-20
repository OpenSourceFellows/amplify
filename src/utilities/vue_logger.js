import VueLogger from 'vue-logger-plugin'
import axios from 'axios'

const ServerLogHook = {
  run: (event) => {
    console.log('ServerLogHook is working')
    axios.post('/api/event_logger/log', {
      severity: event.level,
      data: event.argumentArray
    })
  }
}

// define options
const options = {
  enabled: true,
  level: 'debug',
  afterHooks: [ServerLogHook]
}

// export logger with applied options
export default new VueLogger(options)
