import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import { domain, clientId, audience } from '../auth_config.json'
import { Auth0Plugin } from '@/auth/auth0-plugin'
import 'vuetify/dist/vuetify.min.css'

// for vue-logger-plugin logging
import vueLogger from './utilities/vue_logger'

// for Winston logging
// console.log('here is setimmediate:')
// import 'setimmediate'

// fontawesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import {
  faInstagram,
  faFacebookF,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
library.add(faUserSecret, faInstagram, faFacebookF, faTwitter, faYoutube)

/* add font awesome icon component */
// eslint-disable-next-line vue/component-definition-name-casing
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuetify)

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

// for using vue-logger-plugin
Vue.use(vueLogger)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  components: { FontAwesomeIcon },
  // testing logging
  created: function () {
    const testObject = {
      name: 'test',
      value: 'this is a test object'
    }
    console.log('Hello World')
    this.$log.info('Log Test Message', testObject)
    this.$logger.info('Logger Test Message', testObject)
    this.$log.error(new Error('this.$log.error: something went wrong'))
    this.$logger.error(new Error('this.$logger.error: something went wrong'))
  },
  render: (h) => h(App)
}).$mount('#app')
