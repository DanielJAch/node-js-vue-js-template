import Vue from 'vue';
import App from '@/components/app/index.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
