<template>
  <div class="auth-page">
    <div class="flex flex-center">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Have an account?
            </router-link>
          </p>
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{k}} {{ v | error }}</li>
          </ul>
          <form v-on:submit="onSubmit">
            <q-field class="form-group">
              <q-input class="form-control form-control-lg" type="text" v-model="username" placeholder="Username">
              </q-input>
            </q-field>
            <q-field class="form-group">
              <q-input class="form-control form-control-lg" type="text" v-model="email" placeholder="Email">
              </q-input>
            </q-field>
            <q-field class="form-group">
              <q-input class="form-control form-control-lg" type="password" v-model="password" placeholder="Password">
              </q-input>
            </q-field>
            <q-btn
              color="primary"
              label="Sign up"
              class="right"
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

export default {
  name: 'RwvRegister',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    onSubmit () {
      this.$store.dispatch(REGISTER, {
        email: this.email,
        password: this.password,
        username: this.username
      })
      .then(() => this.$router.push({ name: 'home' }))
    }
  }
}
</script>
