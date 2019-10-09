<template>
  <v-card class="elevation-12 login-form">
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap>
        <v-flex xs10 class="text-xs-center">
          <router-link to="/">
            <img src="/logo.png" alt="" class="circle responsive-img valign profile-image-login">
          </router-link>
        </v-flex>
        <v-flex xs2>
          <v-btn to="/" small fab class="top-right-fixed white">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-form @submit.prevent="onSignup">
            <v-text-field
              v-model="user.fullName"
              prepend-icon="mdi-account-tie"
              name="nombres"
              label="Nombres"
              :error-messages="fullNameErrors"
              required
              @input="$v.user.fullName.$touch()"
              @blur="$v.user.fullName.$touch()"
            />
            <v-text-field
              v-model="user.userName"
              prepend-icon="mdi-account"
              name="userName"
              label="Usuario"
              :error-messages="emailErrors"
              required
              @input="$v.user.userName.$touch()"
              @blur="$v.user.userName.$touch()"
              @focusout="validateEmail()"
            />
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
            />
            <v-btn block color="primary" type="submit">
              Regístrate Ahora
            </v-btn>
          </v-form>
        </v-flex>
        <v-flex xs12>
          {{ message }}
        </v-flex>
        <v-flex xs12 class="text-xs-center">
          <v-flex justify-center>
            <p>
              ¿Ya tienes una cuenta? <router-link to="/auth/sign-in">
                Inicia sesión
              </router-link>
            </p>
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
  name: 'Register',
  mixins: [validationMixin],
  validations: {
    user: {
      fullName: { required },
      userName: { required, minLength: minLength(6) },
      password: { required, minLength: minLength(8) }
    }
  },
  data () {
    return {
      user: {
        userName: '',
        password: ''
      },
      message: '',
      show1: false
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
    emailErrors () {
      const errors = []
      if (!this.$v.user.userName.$dirty) { return errors }
      !this.$v.user.userName.minLength && errors.push('El usuario debe tener como mínimo 6 caracteres')
      !this.$v.user.userName.required && errors.push('Se requiere el E-mail.')
      return errors
    },
    fullNameErrors () {
      const errors = []
      if (!this.$v.user.fullName.$dirty) { return errors }
      !this.$v.user.fullName.required && errors.push('Se requiere el Nombre completo.')
      return errors
    }
  },
  methods: {
    onSignup () {
      const self = this
      self.message = ''
      this.$v.$touch()
      if (!this.$v.$invalid) {
        auth.signup(this.user).then((data) => {
          self.$router.replace('/')
        }).catch((err) => {
          console.log(err.response)
          self.message = err.response.data.message
        })
      }
    },
    validateEmail () {
    }
  }
}
</script>
<style scoped>
      input:not([type]), input[type=text]:not(.browser-default), input[type=password]:not(.browser-default), input[type=userName]:not(.browser-default), input[type=url]:not(.browser-default), input[type=time]:not(.browser-default), input[type=date]:not(.browser-default), input[type=datetime]:not(.browser-default), input[type=datetime-local]:not(.browser-default), input[type=tel]:not(.browser-default), input[type=number]:not(.browser-default), input[type=search]:not(.browser-default), textarea.materialize-textarea {
        margin-bottom:20px;
      }
</style>
