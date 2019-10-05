<template>
  <v-card color="grey lighten-4" flat tile absolute>
    <v-toolbar dense>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Sursa Gas</v-toolbar-title>
      <v-img src="Sursa.png" max-width="38" max-height="38" />
      <div class="flex-grow-1" />
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer  v-model="drawer" absolute temporary><p>test</p></v-navigation-drawer>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      drawer: false
    }
  }
}
</script>
