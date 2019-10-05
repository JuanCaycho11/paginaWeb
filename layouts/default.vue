<template>
  <v-app>
    <toolBar />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import toolBar from '~/components/toolBar'
export default {
  components: {
    toolBar
  }
}
</script>
