<template>
  <v-layout wrap="wrap">
    <v-navigation-drawer v-model="isSelectedChild" absolute="absolute" temporary="temporary">
      <v-img :aspect-ratio="16/9" src="/img/banner-user.jpg">
        <v-layout class="lightbox white--text" pa-2="pa-2" column="column" fill-height="fill-height">
          <v-spacer />
          <v-flex shrink="shrink">
            <div class="subheading">
              <span>{{ $store.state.auth.user.fullName }}</span>
            </div>
          </v-flex>
        </v-layout>
      </v-img>
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
        { icon: 'home', title: 'Base', to: '/base' },
        { icon: 'apps', title: 'Cliente', to: '/customer' },
        { icon: 'ballot', title: 'Registro', to: '/' },
        {
          icon: 'settings',
          title: 'Mis Ajustes',
          items: [
            { icon: 'streetview', title: 'Opcion 1', to: '/' },
            { icon: 'alternate_email', title: 'Opcion 2', to: '/' },
            { icon: 'mail', title: 'Opcion 3', to: '/' },
            { icon: 'security', title: 'Opcion 4', to: '/' }
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
