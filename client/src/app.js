import Vue from 'vue';
import App from '@/components/app/index.vue';
import FormatDateFilter from '@/filters/format-date';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);

Vue.filter('formatDate', FormatDateFilter);

const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

export default app;
