<template>
  <div class="auth-page">
    <div class="flex flex-center">
      <div class="row">
        <div class="col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Have an account?
            </router-link>
          </p>
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{k}} {{ v | error }}</li>
          </ul>
          <form @submit.prevent="()=>{}">
            <q-field
            class="form-group"
            :error="$v.form.username.$error"
            error-label="Please enter a username"
            >
              <q-input class="form-control form-control-lg" type="text" v-model="form.username" placeholder="Username">
              </q-input>
            </q-field>
            <q-field
            class="form-group"
            :error="$v.form.email.$error"
            error-label="Please enter a valid email address"
            >
              <q-input class="form-control form-control-lg" type="text" v-model="form.email" placeholder="Email">
              </q-input>
            </q-field>
            <q-field
            class="form-group"
            :error="$v.form.password.$error"
            error-label="Please enter a password"
            >
              <q-input class="form-control form-control-lg" type="password" v-model="form.password" placeholder="Password">
              </q-input>
            </q-field>
            <q-btn
              v-model="submit"
              color="primary"
              label="Sign up"
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
<style lang="stylus">

</style>
<script>
import { mapState } from 'vuex'
import { REGISTER } from '../store/actions.type'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'RwvRegister',
  data () {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      },
      submit: false,
      error: false
    }
  },
  validations: {
    form: {
      username: { required },
      email: { required, email },
      password: { required }
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    onSubmit () {

      this.$v.form.$touch()

      if (this.$v.form.$error || this.$v.form.$invalid) {
        return false
      }

      this.submit = true

      this.$store.dispatch(REGISTER, {
        email: this.form.email,
        password: this.form.password,
        username: this.form.username
      })
      .then((response) => {
        this.submit = false

        if (response.user.id) {
          this.$router.push({ name: 'home' })
        } else {
          return false;
        }


      })
    }
  }
}
</script>
