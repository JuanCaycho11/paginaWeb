<template>
  <div>
    <nav-bar :drawer="drawer" />
    <v-toolbar
      :color="(green ? '' : 'green')"
      dark
      :fixed="extended"
      :app="extended"
      :clipped-left="extended"
      :extended="extended"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-img
        :aspect-ratio="16/9"
        src="/logo2.png"
        max-width="250"
        max-height="60
      0"
      />
      <!-- <v-toolbar-title>SURSA GAS</v-toolbar-title> -->
      <!-- <v-spacer /> -->
      <v-toolbar-items class="hidden-sm-only hidden-xs-only">
        <v-btn
          v-for="i in menus"
          :key="i.title"
          color="green"
          depressed
          flat
          :to="i.path"
        >
          {{ i.title }}
        </v-btn>
      </v-toolbar-items>
      </v-img>
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
