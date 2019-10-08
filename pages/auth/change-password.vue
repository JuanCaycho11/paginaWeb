<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap align-center justify-center>
      <v-flex xs12 sm6 md5 lg4>
        <v-card class="elevation-12 login-form">
          <v-container grid-list-xl text-xs-center>
            <v-layout row wrap>
              <v-flex xs12 class="text-xs-center">
                <router-link to="/">
                  <img src="/logo.png" alt="" class="circle responsive-img valign profile-image-login">
                </router-link>
                <p class="center login-form-text">
                  Volver a establecer contraseña
                </p>
              </v-flex>
              <v-flex xs12>
                <v-form @submit.prevent="onChangePassword">
                  <v-text-field
                    id="password"
                    v-model="user.password"
                    prepend-icon="lock_outline"
                    :error-messages="passwordErrors"
                    :append-icon="show1 ? 'visibility_off' : 'visibility'"
                    name="password"
                    label="Nueva contraseña"
                    :type="show1 ? 'text' : 'password'"
                    counter
                    @input="$v.user.password.$touch()"
                    @blur="$v.user.password.$touch()"
                    @click:append="show1 = !show1"
                  />
                  <v-text-field
                    id="passwordv"
                    v-model="user.passwordv"
                    prepend-icon="lock_outline"
                    :error-messages="passwordvErrors"
                    :append-icon="show2 ? 'visibility_off' : 'visibility'"
                    name="passwordv"
                    label="Repita la contraseña"
                    :type="show2 ? 'text' : 'password'"
                    counter
                    @input="$v.user.passwordv.$touch()"
                    @blur="$v.user.passwordv.$touch()"
                    @click:append="show2 = !show2"
                  />
                  <v-btn block color="primary" type="submit">
                    Enviar
                  </v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'PasswordResetToken',
  mixins: [validationMixin],
  validations: {
    user: {
      password: { required, minLength: minLength(8) },
      passwordv: { required, sameAsPassword: sameAs('password') }
    }
  },
  data () {
    return {
      user: {
        password: '',
        passwordv: ''
      },
      show1: false,
      show2: false
    }
  },
  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v.user.password.$dirty) { return errors }
      !this.$v.user.password.minLength && errors.push('La contraseña debe tener como mínimo 8 caracteres')
      !this.$v.user.password.required && errors.push('Se requiere la contraseña.')
      return errors
    },
    passwordvErrors () {
      const errors = []
      if (!this.$v.user.passwordv.$dirty) { return errors }
      !this.$v.user.passwordv.required && errors.push('Se requiere la contraseña.')
      !this.$v.user.passwordv.sameAsPassword && errors.push('No coinciden las contraseñas.')
      return errors
    }
  },
  mounted () {
    const self = this
    self.user = self.$store.getters['auth/getUser']
  },
  methods: {
    async onChangePassword () {
      const self = this
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          await this.$store.dispatch('auth/changePassword', this.user)
          alert('¡Genial! Has establecido una contraseña nueva.')
          self.user = {}
          setTimeout(() => {
            self.$router.replace('/')
          }, 1000)
        } catch (e) {
          console.log(e.message)
          alert('A ocurrido un error al cambiar la contraseña, para mas información envienos un correo a tucorreo@nyancat.com.')
        }
      }
    }
  }
}
</script>
