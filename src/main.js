import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils/register-vant.js'
import './styles/index.less'
import 'amfe-flexible'
Vue.config.productionTip = false

new Vue({
  utils,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
