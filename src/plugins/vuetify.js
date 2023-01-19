// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { lightTheme } from '@/configs/theme.js'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: { light: lightTheme },
    options: { customProperties: true }
  }
})

export default vuetify
