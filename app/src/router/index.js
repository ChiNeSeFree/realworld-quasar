import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'

import ApiService from '../common/api.service'
import DateFilter from '../common/date.filter'
import ErrorFilter from '../common/error.filter'
import store from '../store/index'
import { CHECK_AUTH } from '../store/actions.type'

import routes from './routes'

Vue.filter('date', DateFilter)
Vue.filter('error', ErrorFilter)

ApiService.init()
Vue.use(VueRouter)
Vue.use(Vuelidate)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

Router.beforeEach(
  (to, from, next) => {
    return Promise
      .all([store.dispatch(CHECK_AUTH)])
      .then(next)
  }
)

export default Router
