<template>
  <v-row row wrap>
    <v-col>
      <v-card color="grey lighten-4" flat height="100%">
        <v-toolbar color="white">
          <v-icon>mdi-account-circle</v-icon>
          <v-toolbar-title>BASE</v-toolbar-title>
          <v-divider class="mx-2" inset="inset" vertical="vertical" />
          <v-spacer />
          <v-btn outline color="primary" @click="dialog = true">
            <v-icon left>
              add
            </v-icon>Agregar
          </v-btn>
        </v-toolbar>
        <v-card>
          <v-container fluid>
            <v-row row wrap>
              <v-col xs12>
                <v-card>
                  <v-card-title>
                    <add-base
                      :id-base="idBase"
                      :edited-index="editedIndex"
                      :edited-item-m="editedItem"
                      :dialog="dialog"
                      @closedialog="dialog=false; editedIndex = -1; idBase = ''"
                      @adddialog="addBase"
                      @editdialog="editBase"
                    />
                    <v-spacer />
                    <v-text-field
                      v-model="search"
                      append-icon="search"
                      label="Buscar"
                      single-line
                      hide-details
                    />
                  </v-card-title>
                  <v-data-table
                    :headers="headers"
                    :items="bases"
                    :search="search"
                    :total-items="total"
                    disable-initial-sort
                    :rows-per-page-items="rowsPerPageItems"
                    rows-per-page-text="Filas por página:"
                    no-results-text="No existen datos."
                  >
                    <template slot="headerCell" slot-scope="props">
                      <v-tooltip bottom>
                        <span slot="activator">{{ props.header.text }}</span>
                        <span>{{ props.header.text }}</span>
                      </v-tooltip>
                    </template>
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.name }}</td>
                      <td>{{ props.item.description }}</td>
                      <td>
                        <v-icon small @click="editItem(props.item)">
                          edit
                        </v-icon>
                        <v-icon small @click="deleteItem(props.item)">
                          delete
                        </v-icon>
                      </td>
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import axios from 'axios'
import config from '~/config'
import addBase from '~/components/base/add'
export default {
  name: 'Base',
  // middleware: 'auth',
  components: {
    addBase
  },
  data () {
    return {
      total: 0,
      bases: [],
      rowsPerPageItems: [5, 10, 25],
      search: '',
      dialog: false,
      baseEditar: {},
      headers: [
        { text: 'BASE', sortable: false, value: 'name' },
        { text: 'DESCRIPCION', sortable: false, value: 'description' },
        { text: 'ACCIONES', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        description: ''
      },
      idBase: ''
    }
  },
  // async asyncData ({ params, error, store }) {
  //   const bases = await axios.get(`${config.URL}base`, {
  //     headers: store.getters['auth/getAuthHeader']
  //   })
  //   return { bases: bases.data.data }
  // },
  methods: {
    editItem (item) {
      this.idBase = item._id
      this.editedIndex = this.bases.indexOf(item)
      this.dialog = true
    },
    deleteItem (item) {
      this.$swal({
        title: '¿Está seguro que desea eliminar?',
        text: '',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.$swal(
            'Eliminado!',
            'El campo ha sido eliminado correctamente.',
            'success'
          )
          const index = this.bases.indexOf(item)
          axios
            .delete(`${config.URL}base/${item._id}`, {
              headers: this.$store.getters['auth/getAuthHeader']
            })
            .then((data) => {
              console.log(data)
              this.bases.splice(index, 1)
            })
            .catch((err) => {
              console.log(err)
            })
          this.total -= 1
        } else {
        }
      })
    },
    editBase (org) {
      Object.assign(this.bases[this.editedIndex], org)
    },
    addBase (org) {
      this.bases.push(org)
      this.total += 1
    },
    cancelarBase () {
      this.dialog = false
    }
  }
}
</script>
