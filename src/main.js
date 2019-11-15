import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import util from './helpers/util'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(util)
Vue.config.productionTip = false

window.store = store

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
