<template>
  <div>
    <nav-bar v-if="$store.getters['auth/isAuthenticated']" :drawer="drawer" />
    <v-toolbar
      :color="(dark ? '' : 'black')"
      dark
    >
      <v-toolbar-side-icon v-if="$store.getters['auth/isAuthenticated']" @click="drawer = !drawer" />
      <h2 style="color:#fff; text-decoration:none">
        Crud basic Vue
      </h2>
      <v-spacer />
      <v-btn v-if="!$store.getters['auth/isAuthenticated']" text to="/auth/sign-in">
        INICIAR SESIÓN
      </v-btn>
      <v-menu v-if="$store.getters['auth/isAuthenticated']" :nudge-width="160" left>
        <div slot="activator" class="valign-wrapper">
          <span>{{ $store.state.auth.user.fullName }}</span>
          <v-icon dark="dark">
            arrow_drop_down
          </v-icon>
        </div>
        <v-list>
          <v-list-tile to="/">
            <v-list-tile-title><v-icon>apps</v-icon>&nbsp;&nbsp;Inicio</v-list-tile-title>
          </v-list-tile>
          <v-divider />
          <v-list-tile to="/auth/change-password">
            <v-list-tile-title><v-icon>person</v-icon>&nbsp;&nbsp;Perfil</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="cerrarSesion()">
            <v-list-tile-title>
              <v-icon to="/auth/sign-in">
                exit_to_app
              </v-icon> &nbsp;&nbsp;Cerrar Sesión
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
import navBar from '~/components/layout/navBar'
export default {
  components: {
    navBar
  },
  props: {
    dark: { type: Boolean, default: false },
    extended: { type: Boolean, default: false }
  },
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    async cerrarSesion () {
      try {
        await this.$store.dispatch('auth/logout')
        this.$router.go(this.$router.currentRoute)
      } catch (error) {
        console.log(error)
      }
    },
    logout () {
      const self = this
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      self.$router.replace('/auth/sign-in')
    },
    validarEnter (e) {
      if (e.keyCode === 13) { this.enviar(true) }
    }
  }
}
</script>
