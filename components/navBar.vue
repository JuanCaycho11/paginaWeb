<template>
  <v-layout wrap="wrap">
    <v-navigation-drawer v-model="isSelectedChild" absolute="absolute" temporary="temporary">
      <v-img :aspect-ratio="16/9" src="/nav.png">
        <v-layout class="lightbox white--text" pa-2="pa-2" column="column" fill-height="fill-height">
          <v-spacer />
        </v-layout>
      </v-img>
      <v-flex>
        <div justify-center>
          Planta Envasadora de Gas
        </div>
      </v-flex>
      <v-divider /><br>
      <v-list class="pt-0" dense="dense">
        <div v-for="(opt, iopt) in items2" :key="iopt">
          <v-list-tile v-if="opt.to" :to="opt.to">
            <v-list-tile-action>
              <v-icon>{{ opt.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{ opt.title }}</v-list-tile-title>
          </v-list-tile>
          <v-list-group
            v-else-if="opt.items.length > 0"
            :prepend-icon="opt.icon"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>{{ opt.title }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              v-for="(it, iit) in opt.items"
              :key="iit"
              :to="it.to"
            >
              <v-list-tile-title>{{ it.title }}</v-list-tile-title>
              <v-list-tile-action>
                <v-icon>{{ it.icon }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
export default {
  props: {
    drawer: { type: Boolean, default: false }
  },
  data () {
    return {
      isSelectedChild: this.drawer,
      items2: [
        { icon: 'mdi-home', title: 'Inicio', to: '/' },
        { icon: 'mdi-account-group', title: 'Nosotros', to: '/nosotros' },
        {
          icon: 'mdi-book-minus',
          title: 'Áreas de Formación',
          items: [
            { icon: '', title: 'Desarrollo de Sistemas de Información', to: '/especialidad/dsi' },
            { icon: '', title: 'Enfermería Técnica', to: '/especialidad/enfermeria' },
            { icon: '', title: 'Contabilidad', to: '/especialidad/contabilidad' }
          ]
        },
        {
          icon: 'mdi-book-minus',
          title: 'Cursos y Programas de Extensión',
          items: [
            { icon: '', title: 'Admisión', to: '/' },
            { icon: '', title: 'Servicios de Biblioteca', to: '/' },
            { icon: '', title: 'Sistema de Admisión', to: '/' },
            { icon: '', title: 'Bolsa de Trabajo', to: '/' },
            { icon: '', title: 'Titulación', to: '/' },
            { icon: '', title: 'Revista', to: '/' },
            { icon: '', title: 'Contáctenos', to: '/' }
          ]
        }
      ]
    }
  },
  watch: {
    drawer () {
      this.isSelectedChild = true
    }
  }
}
</script>
