// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        theme_darkBlue: '#083D77',
        theme_orange: '#FE5E41',
        theme_beige: '#FCD7AD',
        theme_yellow: '#F3B700',
        theme_blue: '#38618C',
        theme_black: '#333333',
        theme_mediumGray: '#BBBBBB',
        theme_lightGray: '#EEEEEE',
        theme_white: 'FFFFFF'
      }
    }
  }
})

export default vuetify
