import VueLogger from 'vue-logger-plugin'
import axios from 'axios'

// after hook to send log messages to api endpoint
const ServerLogHook = {
  run: (event) => {
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
