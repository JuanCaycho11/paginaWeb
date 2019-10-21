<template>
  <v-card class="elevation-12 login-form">
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap>
        <v-flex xs10 class="text-xs-center">
          <router-link to="/">
            <img src="/logo.png" alt class="circle responsive-img valign profile-image-login">
          </router-link>
        </v-flex>
        <v-flex xs2>
          <v-btn to="/" small fab class="top-right-fixed white">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="user.userName"
              prepend-icon="mdi-account"
              name="login"
              label="Usuario"
              :error-messages="userNameErrors"
              required
              @input="$v.user.userName.$touch()"
              @blur="$v.user.userName.$touch()"
            /><br>
            <v-text-field
              id="password"
              v-model="user.password"
              prepend-icon="mdi-lock-open"
              :error-messages="passwordErrors"
              :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
              name="password"
              label="Contraseña"
              :type="show1 ? 'text' : 'password'"
              counter
              @input="$v.user.password.$touch()"
              @blur="$v.user.password.$touch()"
              @click:append="show1 = !show1"
            /><br>
            <v-btn block color="success" type="submit">
              Iniciar sesión
            </v-btn>
          </v-form>
        </v-flex>
        <v-flex xs12>
          {{ message }}
        </v-flex>
        <v-flex xs12>
          <v-flex>
            <p class="margin medium-small">
              <router-link to="/auth/register">
                ¡Regístrate ahora!
              </router-link>
            </p>
            <v-spacer />
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import auth from '~/plugins/auth'

export default {
  layout: 'centered',
  name: 'Signin',
  mixins: [validationMixin],
  validations: {
    user: {
      userName: { required, minLength: minLength(6) },
      password: { required, minLength: minLength(8) }
    }
  },
  data () {
    return {
      user: {
        userName: 'JMCAYCHO',
        password: '11111111'
      },
      message: '',
      show1: false
    }
  },
  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v.user.password.$dirty) { return errors }
      !this.$v.user.password.minLength &&
        errors.push('La contraseña debe tener como mínimo 8 caracteres')
      !this.$v.user.password.required &&
        errors.push('Se requiere la contraseña.')
      return errors
    },
    userNameErrors () {
      const errors = []
      if (!this.$v.user.userName.$dirty) { return errors }
      !this.$v.user.userName.minLength &&
        errors.push('El usuario debe tener como mínimo 8 caracteres')
      !this.$v.user.userName.required && errors.push('Se requiere el Usuario.')
      return errors
    }
  },
  methods: {
    async login () {
      const self = this
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          await this.$store.dispatch('auth/login', this.user)
          self.message = 'Bienvenido...!'
          self.$router.replace('/')
        } catch (e) {
          this.message = e.message
        }
      }
    },
    onSignin () {
      const self = this
      this.$v.$touch()
      if (!this.$v.$invalid) {
        auth
          .login(this.user)
          .then((data) => {
            self.message = ''
            self.$router.replace('/')
          })
          .catch((err) => {
            self.message = err.response.data.message
          })
      }
    }
  }
}
</script>
