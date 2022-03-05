import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import api from "./api"
import vuetify from './plugins/vuetify'
import moment from 'vue-moment';

Vue.config.productionTip = false
Vue.prototype.$http = api;
Vue.prototype.$http.options.crossOrigin = true
Vue.use(moment)

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount('#app')
