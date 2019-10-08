<template>
  <div>
    <modalForm
      :width="'400px'"
      :height="'100px'"
      :loading="loading"
      :form-title="formTitle"
      :dialog="dialog"
      :edited-index="editedIndex"
      @closedialog="close()"
      @savedialog="save()"
    >
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              ref="nombre"
              v-model.trim="editedItem.name"
              label="Base"
              placeholder="Base"
              :error-messages="nameErrors"
              required
              @input="$v.editedItem.name.$touch()"
              @blur="$v.editedItem.name.$touch()"
            />
          </v-flex>
          <v-flex xs12>
            <v-text-field
              ref="descripcion"
              v-model.trim="editedItem.description"
              label="Descripcion"
              placeholder="Descripcion"
              :error-messages="descriptionErrors"
              required
              @input="$v.editedItem.description.$touch()"
              @blur="$v.editedItem.description.$touch()"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </modalForm>
  </div>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import config from '~/config'
import modalForm from '~/components/modalForm/form'
export default {
  name: 'Addbase',
  mixins: [validationMixin],
  validations: {
    editedItem: {
      name: { required, maxLength: maxLength(40) },
      description: { maxLength: maxLength(100) }
    }
  },
  props: {
    editedIndex: { type: Number, default: 0 },
    dialog: { type: Boolean, default: false },
    editedItemM: { type: Object, default () { return {} } },
    idBase: { type: String, default: '' }
  },
  data () {
    return {
      loading: false,
      editedItem: {
        name: '',
        description: ''
      }
    }
  },
  components: {
    modalForm
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Crear Base' : 'Editar Base'
    },
    nameErrors () {
      const errors = []
      if (!this.$v.editedItem.name.$dirty) { return errors }
      !this.$v.editedItem.name.maxLength && errors.push('La descripción debe tener máximo 40 caracteres')
      !this.$v.editedItem.name.required && errors.push('Se requiere Base.')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.editedItem.description.$dirty) { return errors }
      !this.$v.editedItem.description.maxLength && errors.push('La descripción debe tener como máximo 100 caracteres')
      return errors
    }
  },
  watch: {
    idBase (val) {
      if (val) {
        axios.get(`${config.URL}base/${val}`, { headers: this.$store.getters['auth/getAuthHeader'] }).then((data) => {
          this.editedItem = data.data.data
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    editedItemM () {
      this.editedItem = Object.assign({})
    }
  },
  methods: {
    close () {
      this.$v.$reset()
      this.$emit('closedialog')
      setTimeout(() => {
        this.editedItem = Object.assign({})
      }, 300)
    },
    save () {
      const self = this
      if (self.editedItem.name === '') { self.$refs.nombre.focus() }
      if (self.editedItem.email === '') { self.$refs.correo.focus() }
      self.$v.$touch()
      if (!self.$v.$invalid) {
        if (self.editedIndex > -1) {
          self.loading = true
          axios.put(`${config.URL}base/${self.editedItem._id}`, self.editedItem, { headers: self.$store.getters['auth/getAuthHeader'] }).then((data) => {
            self.$emit('editdialog', self.editedItem)
            self.loading = false
            self.close()
          }).catch((err) => {
            console.log(err.response)
            self.loading = false
            self.mensaje(true, 'error', err.response, 5000)
          })
        } else {
          self.loading = true
          axios.post(`${config.URL}base`, self.editedItem, { headers: self.$store.getters['auth/getAuthHeader'] }).then((data) => {
            self.$emit('adddialog', data.data.data)
            self.loading = false
            self.close()
          }).catch((err) => {
            console.log(err.response)
            self.loading = false
            self.mensaje(true, 'error', err.response, 5000)
          })
        }
      }
    }
  }
}
</script>
