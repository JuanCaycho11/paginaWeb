<template>
  <v-footer
    dark
    padless
  >
    <v-layout
      wrap
      class="green lighten-1 white--text text-center"
    >
      <v-flex xs12>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="26px">
            {{ icon }}
          </v-icon>
        </v-btn>
        <v-divider />
      </v-flex>
      <v-layout class="white--text pt-0" wrap row>
        <v-flex xs3>
          <h5>PLANTA ENVASADORA:</h5>
          <span>Panamericana Sur Km. 59 Olof <br> Palme Telf.: 231-9006/231-9005</span>
        </v-flex>
        <v-flex xs3>
          <h5>CAÑETE:</h5>
          <span>Av. Jose Galvez C-2 Tda. N° 13<br> San Vicente - Cañete Telf.: 581-2538</span>
        </v-flex>
        <v-flex xs3>
          <h5>CHINCHA:</h5>
          <span>Prolong. Pedro Moreno 884 <br> Chincha Alta. Telf.: 056-269216</span>
        </v-flex>
        <v-flex xs3>
          <h5>ICA:</h5>
          <span>Urb. Villa Aurora los Fardos.<br> ICA Telf.: 056-218320</span>
        </v-flex>
      </v-layout>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Sursa Gas</strong>
      </v-card-text>
    </v-layout>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-whatsapp',
      'mdi-linkedin',
      'mdi-instagram'
    ]
  })
}
</script>
<style scoped>
span {
font-size: 14px;
}
</style>
