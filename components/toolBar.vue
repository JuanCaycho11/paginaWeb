<template>
  <div>
    <nav-bar :drawer="drawer" />
    <v-toolbar
      color="green"
      dark
      :fixed="extended"
      :app="extended"
      :extended="extended"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>
        <v-col class="p-2">
          <v-img src="/logo.png" />
        </v-col>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-only hidden-xs-only">
        <v-btn
          v-for="i in menus"
          :key="i.title"
          text
          color="light"
          depressed
          :to="i.path"
        >
          {{ i.title }}
        </v-btn>
        <v-btn text color="light" depressed to="/auth/sign-in">
          <v-icon>
            mdi-login
          </v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import navBar from '~/components/navBar'
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
      drawer: false,
      menus: [
        { title: 'Inicio', path: '/', icon: 'adb' },
        { title: 'Nosotros', path: '/nosotros', icon: 'adb' },
        { title: 'Productos', path: '/productos', icon: 'adb' },
        { title: 'Contacto', path: '/contacto', icon: 'adb' }
      ]
    }
  }
}
</script>
