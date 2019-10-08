<template>
  <v-app>
    <toolbar />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import toolbar from '~/components/layout/toolBar'
export default {
  components: {
    toolbar
  }
}
</script>
