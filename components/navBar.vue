<template>
  <v-layout wrap row>
    <v-navigation-drawer v-model="isSelectedChild" absolute temporary>
      <v-img :aspect-ratio="16/9" src="/nav.png">
        <v-layout class="lightbox white--text" pa-2="pa-2" column fill-height="fill-height">
          <v-spacer />
        </v-layout>
      </v-img>
      <v-flex>
        <div>
          Planta Envasadora de Gas
        </div>
      </v-flex>
      <v-divider /><br>
      <v-list class="pt-0" dense="dense">
        <div v-for="(opt, iopt) in items2" :key="iopt">
          <v-list-item v-if="opt.to" :to="opt.to">
            <v-list-item-action>
              <v-icon>{{ opt.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title>{{ opt.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item-group
            v-else-if="opt.items.length > 0"
            :prepend-icon="opt.icon"
            no-action
          >
            <v-list-item slot="activator">
              <v-list-item-title>{{ opt.title }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-for="(it, iit) in opt.items"
              :key="iit"
              :to="it.to"
            >
              <v-list-item-title>{{ it.title }}</v-list-item-title>
              <v-list-item-action>
                <v-icon>{{ it.icon }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
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
