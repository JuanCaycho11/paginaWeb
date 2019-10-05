import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import colors from 'vuetify/es5/util/colors'
import Vuetify, {
  VApp,
  VNavigationDrawer,
  VFooter,
  VToolbar
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.darken3,
    accent: colors.grey.darken3,
    eblue: colors.blue.darken4,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3,
    third: colors.blue.darken1,
    quarter: colors.grey.lighten1
  },
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VToolbar
  },
  directives: {
    Ripple
  }
})

Vue.use(vClickOutside)