<template>
  <div>
    <nav-bar :drawer="drawer" />
    <v-toolbar
      :color="(dark ? '' : 'black')"
      dark
      :fixed="extended"
      :app="extended"
      :clipped-left="extended"
      :extended="extended"
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-items class="hidden-sm-only hidden-xs-only">
        <v-btn v-for="i in menus" :key="i.title" flat :to="i.path">
          {{ i.title }}
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
