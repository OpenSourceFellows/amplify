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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
