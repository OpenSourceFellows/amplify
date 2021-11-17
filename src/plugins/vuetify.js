import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

new Vuetify({
    theme: {
        themes: {
            light: {
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
});

export default new Vuetify({});
