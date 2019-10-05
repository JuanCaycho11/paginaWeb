<template>
  <v-app>
    <toolBar />
    <v-content>
      <nuxt />
    </v-content>
    <pie />
  </v-app>
</template>

<script>
import toolBar from '~/components/toolBar'
import Pie from '~/components/Pie'
export default {
  components: {
    toolBar,
    Pie
  }
}
</script>
