<template>
  <v-app>
    <toolbar />
    <v-content>
      <nuxt />
    </v-content>
    <pie />
  </v-app>
</template>

<script>

import toolbar from '~/components/toolBar'
import pie from '~/components/Pie'
export default {
  components: {
    toolbar,
    pie

  }
}
</script>
