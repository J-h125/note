import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,  //等同于 router : router
  store,
  render: h => h(App)
}).$mount('#app')
