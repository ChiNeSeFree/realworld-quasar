<template>
  <div class="auth-page">
    <div class="flex flex-center">
      <div class="row">
        <div class="col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              Need an account?
            </router-link>
          </p>
          <ul v-if="errors" class="error-messages">
            <li
              v-for="(v, k) in errors"
              :key="k">
              {{k}} {{ v | error }}
            </li>
          </ul>
          <form @submit.prevent="()=>{}">
            <q-field
              class="form-group"
              :error="$v.form.email.$error"
              error-label="Please enter valid email address"
              >
              <q-input
                class="form-control form-control-lg"
                type="text"
                v-model="form.email"
                placeholder="Email">
              </q-input>
            </q-field>
            <q-field
              class="form-group"
              :error="$v.form.password.$error"
              error-label="Please enter your password"
              >
              <q-input
                class="form-control form-control-lg"
                type="password"
                v-model="form.password"
                placeholder="Password">
              </q-input>
            </q-field>
            <q-btn
              color="primary"
              label="Sign in"
              class="right"
              @click="onSubmit($event)"
              >
            </q-btn>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { LOGIN } from '../store/actions.type'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'RwvLogin',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      submit: false,
      error: false
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },
  methods: {
    onSubmit (email, password) {

      this.$v.form.$touch()

      if (this.$v.form.$error || this.$v.form.$invalid) {
        return false
      }

      this.submit = true

      this.$store
        .dispatch(LOGIN, { email: this.form.email, password: this.form.password })
        .then(() => {
          this.submit = false
          this.$router.push({ name: 'home' })
        })
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
}
</script>
