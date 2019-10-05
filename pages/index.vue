<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">
          Planta envasadora de GLP
        </v-card-title>
        <v-card-text>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nesciunt quam nostrum est, quod suscipit quas repellendus animi voluptatum in aliquam. Alias quia facere veniam facilis accusamus explicabo et ducimus.</p>
          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3">
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      components: {

      }
    }
  }
}
</script>
