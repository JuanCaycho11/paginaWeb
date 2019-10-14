<template>
  <div>
    <v-dialog v-model="dialog" persistent scrollable :max-width="width">
      <v-card>
        <v-card-title primary-title>
          <v-list-tile-actions v-if="e1 > 1">
            <v-btn v-if="editedIndex === -1" icon ripple @click="enviar">
              <v-icon color="grey lighten-1">
                keyboard_arrow_left
              </v-icon>
            </v-btn>
          </v-list-tile-actions>
          <v-spacer />
          <span class="headline">
            {{ formTitle }}
          </span>
          <v-spacer />
          <v-btn icon ripple @click="close">
            <v-icon color="grey lighten-1">
              close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text :style="`height: ${height}px`">
          <slot />
        </v-card-text>
        <v-divider />
        <v-card-actions v-if="mostrar">
          <v-spacer />
          <v-btn color="primary" flat @click="close">
            Cancelar
          </v-btn>
          <v-btn color="primary" :loading="loading" :disabled="loading" @click="save">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card color="primary" dark>
        <v-card-text>
          {{ this.editedIndex === -1 ? 'Guardando...' : 'Actualizando...' }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    formTitle: { type: String, default: '' },
    dialog: { type: Boolean, default: false },
    width: { type: String, default: '400' },
    height: { type: String, default: '500' },
    mostrar: { type: Boolean, default: true },
    e1: { type: Number, default: 0 },
    editedIndex: { type: Number, default: -1 },
    loading: { type: Boolean, default: false }
  },
  data () {
    return {
    }
  },
  methods: {
    enviar () {
      this.$emit('enviarValor', false, 'All')
    },
    close () {
      this.$emit('closedialog')
    },
    save () {
      this.$emit('savedialog')
    }
  }
}
</script>
<style>
h1 { cursor: pointer; }
</style>
