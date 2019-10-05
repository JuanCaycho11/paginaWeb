<template>
<v-app >
  <toolBar />
  <v-container>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-container>
        <pie />
  </v-app>
</template>

<script>
import Pie from '~/components/Pie.vue'
import toolBar from '~/components/toolBar.vue'
export default {
  components: {
    Pie,
    toolBar
  }
}
</script>
